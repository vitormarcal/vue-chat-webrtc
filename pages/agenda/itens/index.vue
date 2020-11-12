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
              <b-link :to="row.item.pagina">
                <b-icon-link45deg></b-icon-link45deg>
              </b-link>
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
import {BIcon, BIconArrowUp, BIconLink45deg} from 'bootstrap-vue'

import ConsultaService from '@/services/consulta.service'

export default {
  middleware: ['autenticado'],
  components: {
    BIcon,
    BIconArrowUp,
    BIconLink45deg
  },
  data() {
    return {
      consultas: [],
      isBusy: false,
      fields: [
        {key: 'dataMarcada', label: 'Data Marcada', sortable: true},
        {key: 'horario', label: 'Horário', sortable: true},
        {key: 'fimHorario', label: 'Finalizado em', sortable: true},
        {key: 'especialidade', label: 'Especialidade', sortable: true},
        {key: 'ir', label: 'Ir', sortable: false},
      ],
      perPage: 10,
      currentPage: 1,
    }
  },
  computed: {
    usuarioCorrente() {
      return this.$store.state.auth.user;
    },
    rows() {
      return this.consultas.length
    },
  },
  mounted() {
    ConsultaService.buscarConsultasDoUsuarioLogado()
      .then(
        consultas => {
          this.consultas = consultas
          this.consultas.forEach(c => {
            c.pagina = `/atendimento/${c.idConsulta}`;
          })
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
