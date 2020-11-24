<template>
  <b-container class="container">

    <div>
      <h1 class="title">
        Seus atendimentos
      </h1>

      <p class="subtitle">
        Aqui você visualiza os seus atendimentos passados, díponiveis ou pendentes
      </p>
    </div>

    <b-form-group label="Escolha o dia:">
      <b-col md="auto">
        <b-calendar locale="pt-BR" :date-disabled-fn="dateDisabled" v-model="selecaoData"></b-calendar>
      </b-col>
    </b-form-group>

    <b-form-group label="Mostrar: ">
      <b-form-radio-group id="filtro-status" v-model="filtroStatus"
                          name="filtro-status">
        <b-form-radio value="">
          <b-badge variant="light">Tudo</b-badge>
        </b-form-radio>
        <b-form-radio value="agendado">
          <b-badge variant="info">Agendado</b-badge>
        </b-form-radio>
        <b-form-radio value="finalizado">
          <b-badge variant="secondary">Finalizado</b-badge>
        </b-form-radio>
        <b-form-radio value="disponivel">
          <b-badge variant="success">Disponível</b-badge>
        </b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <template>
      <div id="fsTabela" style="">
        <div class="row">
          <b-table striped hover id="tabela-disponiveis" class="text-left"
                   :busy="isBusy"
                   :fields="fields"
                   :per-page="perPage"
                   :current-page="currentPage"
                   :items="registros">
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Buscando...</strong>
              </div>
            </template>
            <template #cell(especialidade)="row">
              <span>{{ row.item.especialidade }}</span>
              <b-badge variant="info" v-if="row.item.status === 'Agendado'">Agendado</b-badge>
              <b-badge variant="secondary" v-else-if="row.item.status === 'Finalizado'">
                Finalizado
              </b-badge>
              <b-badge variant="success" v-else>Disponível</b-badge>
            </template>
            <template #cell(ir)="row">
              <b-button-group size="sm">
                <b-button title="Ir até atendimento" :to="row.item.pagina">
                  <b-icon-link45deg></b-icon-link45deg>
                </b-button>
                <b-button v-if="row.item.podeRemover" @click="removerConsultaDisponivel(row.item)"
                          title="Remover da agenda">
                  <b-icon-trash></b-icon-trash>
                </b-button>
              </b-button-group>
            </template>
          </b-table>
        </div>
        <div class="center">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="tabela-disponiveis"
          ></b-pagination>
        </div>

      </div>
    </template>


  </b-container>
</template>

<script>
import {BIconLink45deg, BIconTrash} from 'bootstrap-vue'

import ConsultaService from '@/services/consulta.service'

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

export default {
  middleware: ['autenticado', 'cadastro-incompleto'],
  components: {
    BIconLink45deg,
    BIconTrash,
  },
  data() {
    return {
      consultas: [],
      isBusy: false,
      perPage: 10,
      currentPage: 1,
      selecaoData: formatDate(new Date()),
      filtroStatus: '',
    }
  },
  methods: {
    dateDisabled(ymd, date) {
      return !this.diasComAgenda.includes(ymd)
    },
    podeRemover(item) {
      return this.tecnico && !item.fimHorario && !item.idUsuario;
    },
    removerConsultaDisponivel(item) {
      ConsultaService.removerConsultaDisponivel(item.idConsulta).then(
        () => {
          this.consultas = this.consultas.filter(i => i.idConsulta !== item.idConsulta)
          this.$bvToast.toast('Horário disponivel removido com sucesso', {
            title: 'Remoção de horário disponivel:',
            variant: 'success',
            solid: true
          })
        }
      ).catch(
        error => {
          let message = "Ocorreu um erro";
          if (error?.response?.data?.message) {
            message = error.response.data.message
          } else if (error?.message) {
            message = error.message;
          }
          this.$bvToast.toast(message, {
            title: 'Remoção de horário:',
            variant: 'danger',
            solid: true
          })
        }
      )
    }
  },
  computed: {
    fields() {
      return [
        {key: 'horario', label: 'Horário', sortable: true},
        {key: 'especialidade', label: 'Especialidade', sortable: true},
        {key: 'ir', label: 'Ação', sortable: false},];
    },
    usuarioCorrente() {
      return this.$store.state.auth.user;
    },
    tecnico() {
      return this.usuarioCorrente?.includes('T');
    },
    rows() {
      return this.registros?.length
    },
    registros() {
      let consultas = this.consultas;
      if (this.selecaoData) {
        consultas = this.consultas.filter(c => c.dataMarcada === this.selecaoData)
      }

      if (this.filtroStatus === 'finalizado') {
        consultas = consultas.filter(c => c.finalizado)
      } else if (this.filtroStatus === 'agendado') {
        consultas = consultas.filter(c => c.agendado);
      } else if (this.filtroStatus === 'disponivel') {
        consultas = consultas.filter(c => c.disponivel)
      }

      return consultas;
    },
    diasComAgenda() {
      return [...new Set(this.consultas.map(c => c.dataMarcada))];
    }
  },
  mounted() {
    ConsultaService.buscarConsultasDoUsuarioLogado()
      .then(
        consultas => {
          consultas.forEach(c => {
            c.pagina = `/atendimento/${c.idConsulta}`;
            c.podeRemover = this.podeRemover(c)
            c.status = c.fimHorario ? 'Finalizado' : c.idUsuario ? 'Agendado' : 'Disponível'
            c.finalizado = !!c.fimHorario && !!c.idUsuario
            c.agendado = !c.fimHorario && !!c.idUsuario
            c.disponivel = !c.agendado && !c.finalizado
          })
          this.consultas = consultas
        }
      )
  }
}
</script>

<style scoped>

.container {
  margin: 5vh auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5vh;
}

.links a {
  padding: 5px 5px;
  margin-left: 0;
}


.title {
  font-family: 'Quicksand',
  'Source Sans Pro',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  'Helvetica Neue',
  Arial,
  sans-serif;
  display: block;
  font-weight: 300;
  font-size: 32px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 1rem;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}


@media (min-width: 486px) {
  td span:last-child {
    float: right;
    margin-left: 5px;
  }
}

</style>
