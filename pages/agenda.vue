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
        <b-table striped hover :busy="isBusy" :fields="fields" :items="disponiveis">
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Buscando...</strong>
            </div>
          </template>
          <template #cell(selecionar)="row">
            <b-form-checkbox v-model="row.item.selecionado">

            </b-form-checkbox>
          </template>
        </b-table>
      </div>
      <div class="row align-items-center">

        <ul class="pagination ">
          <li class="paginate_button first disabled links" id="tblTabela_first"><a href="#" class="button--grey"
                                                                                   aria-controls="tblTabela"
                                                                                   data-dt-idx="0"
                                                                                   tabindex="0">Primeiro</a>
          </li>
          <li class="paginate_button previous disabled links" id="tblTabela_previous"><a href="#"
                                                                                         class="button--grey"
                                                                                         aria-controls="tblTabela"
                                                                                         data-dt-idx="1"
                                                                                         tabindex="0">Anterior</a>
          </li>
          <li class="paginate_button next disabled links" id="tblTabela_next"><a href="#" class="button--grey"
                                                                                 aria-controls="tblTabela"
                                                                                 data-dt-idx="2"
                                                                                 tabindex="0">Próximo</a>
          </li>
          <li class="paginate_button last disabled links" id="tblTabela_last"><a href="#" class="button--grey"
                                                                                 aria-controls="tblTabela"
                                                                                 data-dt-idx="3"
                                                                                 tabindex="0">Último</a>
          </li>
        </ul>
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
      disponiveis: []
    }
  },
  methods: {
    filtrar() {
      this.isBusy = true
      ConsultaService.buscarTodasDisponiveis({data: this.diaDaConsulta, idEspecialidade: this.idEspecialidade})
        .then(lista => {
          this.disponiveis = lista;
        }).catch(error => this.$bvToast.toast("Erro ao buscar horários disponiveis", {
        title: 'Agenda:',
        variant: 'danger',
        solid: true
      })).finally(() => {
        this.isBusy = false
      })
    },
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

.links {
  padding-top: 15px;
  padding-left: 15px;
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
