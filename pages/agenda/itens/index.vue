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

    <template>
      <div id="fsTabela" style="">
        <div class="row">
          <b-table striped hover id="tabela-disponiveis"
                   :busy="isBusy"
                   :fields="fields"
                   :per-page="perPage"
                   :current-page="currentPage"
                   :items="consultas">
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Buscando...</strong>
              </div>
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
            <template #cell(agendado)="row">
              <span v-if="row.item.fimHorario">Finalizado</span>
              <span v-else-if="row.item.idUsuario">Agendado</span>
              <span v-else>Disponível</span>
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
    }
  },
  methods: {
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
      let fields = [{key: 'dataMarcada', label: 'Data Marcada', sortable: true},
        {key: 'horario', label: 'Horário', sortable: true},
        {key: 'fimHorario', label: 'Finalizado em', sortable: true},
        {key: 'especialidade', label: 'Especialidade', sortable: true},
        {key: 'ir', label: 'Ir', sortable: false},]

      if (this.usuarioCorrente?.includes('T')) {
        fields.push({key: 'agendado', label: 'Status', sortable: true})
      }

      return fields;
    },
    usuarioCorrente() {
      return this.$store.state.auth.user;
    },
    tecnico() {
      return this.usuarioCorrente?.includes('T');
    },
    rows() {
      return this.consultas.length
    },
  },
  mounted() {
    ConsultaService.buscarConsultasDoUsuarioLogado()
      .then(
        consultas => {
          consultas.forEach(c => {
            c.pagina = `/atendimento/${c.idConsulta}`;
            c.podeRemover = this.podeRemover(c)
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

</style>
