<template>
  <b-container class="container">

    <div>
      <h1 class="title">
        Agenda para Teleatendimento
      </h1>

      <p class="subtitle">
        Essa agenda é destinada para pessoas que desejam o atendimento on-line
      </p>
    </div>


    <selecao-especialidades :especialidade.sync="idEspecialidade" @change="filtrar"></selecao-especialidades>

    <b-form-group label="Escolha o dia:">
      <b-col md="auto">
        <b-calendar :min="new Date()" v-model="diaDaConsulta" locale="en-US"
                    @selected="filtrar"></b-calendar>
      </b-col>
    </b-form-group>


    <div id="fsTabela" style="">
      <div class="row">
        <b-table striped hover id="tabela-disponiveis"
                 :busy="isBusy"
                 :fields="fields"
                 :per-page="perPage"
                 :current-page="currentPage"
                 :items="disponiveis">
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Buscando...</strong>
            </div>
          </template>
          <template #cell(selecionar)="row">
            <b-form-checkbox :disabled="selecao.selecionado && selecao !== row.item" v-model="row.item.selecionado">

            </b-form-checkbox>
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

    <div class="table-footer">
      <div class="table-options" :class="{'table-options--show':this.selecao.selecionado}">
        <span class="table-options__number">{{this.selecao.dataMarcada}} {{this.selecao.horario}}</span>
        <span class="table-options__text">
                    {{this.selecao.especialidade}}
                </span>
        <b-button variant="primary">
          Agendar
        </b-button>
      </div>
    </div>

  </b-container>
</template>

<script>
import SelecaoEspecialidades from "../components/tecnico/SelecaoEspecialidades";
import ConsultaService from "../services/consulta.service";

function formatDate(date) {
  let d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  } else if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
}

export default {
  name: "agenda.vue",
  components: {SelecaoEspecialidades},
  middleware: ['autenticado', 'cadastro-incompleto'],
  data() {
    return {
      isBusy: false,
      diaDaConsulta: formatDate(new Date()),
      idEspecialidade: null,
      fields: [
        {key: 'selecionar', label: 'Seleção'},
        {key: 'horario', label: 'Horário'},
        {key: 'especialidade', label: 'Especialidade'},
      ],
      perPage: 10,
      currentPage: 1,
      disponiveis: []
    }
  },
  methods: {
    filtrar() {
      this.isBusy = true
      ConsultaService.buscarTodasDisponiveis({data: this.diaDaConsulta, idEspecialidade: this.idEspecialidade})
        .then(lista => {
          this.disponiveis = lista;
          this.disponiveis.forEach(item => {
            item.horario = item.horario.substring(0, 5)
          })
        }).catch(error => this.$bvToast.toast("Erro ao buscar horários disponiveis", {
        title: 'Agenda:',
        variant: 'danger',
        solid: true
      })).finally(() => {
        this.isBusy = false
      })
    },
  },
  computed: {
    rows() {
      return this.disponiveis.length
    },
    selecao() {
      return this.disponiveis.find(i => i.selecionado) || {};
    }
  },
  mounted() {
    this.filtrar();
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


#fsTabela {
  padding-bottom: 4rem;
}

.table-footer {
  text-align: center;
}


.table-options {
  position: fixed;
  width: 100%;
  background: #FFF;
  bottom: 0;
  left: 0;
  box-shadow: 0px -10px 12px 0px rgba(0, 0, 0, 0.06);
  padding: 15px 50px;
  display: flex;
  flex-flow: row nowrap;
  gap: 15px;
  align-items: center;
  transform: translateY(110%);
  transition: transform 0.3s ease-out;
  z-index: 99;
}

.table-options--show {
  transform: translateY(0);
}

span.table-options__number {
  font-size: 2rem;
  font-weight: 400;
  line-height: 1em;
}

.table-options__text {
  flex-grow: 1;
  text-align: left;
  font-size: 1.2rem;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  span.table-options__number {
    font-size: 15px;
  }

  .table-options__text {
    font-size: 15px;
  }
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
