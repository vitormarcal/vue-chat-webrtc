<template>
  <b-container class="container">
    <div>
      <h1 class="title">
        Chat de Teleatendimento
      </h1>

      <p class="subtitle" v-if="this.podeConversarNoChat">
        Você está no atendimento agendado para a especialidade {{ this.tituloChat }}

      </p>

      <p class="subtitle" v-else>
        Você está vizualizando o histórico do atendimento para a especialidade {{ this.tituloChat }}
        <br>
        <template v-if="this.fimConsulta">
          O atendimento já foi finalizado: {{ this.dataConsulta }}
        </template>

      </p>


      <chat v-if="this.podeVisualizarChat"
            :to="destinatario"
            :id-consulta="this.id"
            :title="this.tituloChat"
            :ativo="podeConversarNoChat"
            :from="this.usuarioCorrente"
            :mensagens.sync="mensagens"
            >

      </chat>

      <div v-else>
        <b-spinner small label="Small Spinner"></b-spinner>
        <b-spinner small label="Small Spinner" type="grow"></b-spinner>
      </div>

    </div>
  </b-container>
</template>

<script>
import Chat from "../../components/atendimento/Chat";
import ConsultaService from "@/services/consulta.service"

export default {
  name: "index",
  middleware: ['autenticado', 'cadastro-incompleto'],
  components: {Chat},
  data() {
    return {
      consulta: null,
      podeVisualizarChat: false,
      mensagens: [],
      interval: null
    }
  },
  async asyncData({params}) {
    const id = params.slug;
    return {id}
  },
  methods: {
    montarRegras() {
      const that = this;
      this.interval = setInterval(() => {
        if (!that.podeVisualizarChat) {
          if (that.dataConsulta && that.fimConsulta) {
            that.podeVisualizarChat = true;
          } else if (that.dataConsulta && !that.fimConsulta && new Date().getTime() >= that.dataConsulta.getTime() ){
            that.podeVisualizarChat =  true;
          }
        }
        if (that.podeVisualizarChat) {
          clearInterval(that.interval)
        }
      }, 1000)
    }
  },
  computed: {
    podeConversarNoChat() {
      return this.podeVisualizarChat && !this.fimConsulta
    },
    usuarioCorrente() {
      return this.$store.state.auth.user;
    },
    tituloChat() {
      return this.consulta?.especialidade;
    },
    dataConsulta() {
      return this.consulta?.dataConsulta ?  new Date(this.consulta.dataConsulta) : null
    },
    fimConsulta() {
      return this.consulta?.fimConsulta ?  new Date(this.consulta.fimConsulta) : null;
    },
    destinatario() {
      if (this.usuarioCorrente.id === this.consulta?.idUsuarioTecnico) {
        return {
          id: this.consulta?.idUsuario,
          nome: this.consulta?.nomeUsuario || this.consulta?.usernameUsuario
        }
      } else if (this.usuarioCorrente.id === this.consulta?.idUsuario) {
        return {
          id: this.consulta?.idUsuarioTecnico,
          nome: this.consulta?.nomeTecnico || this.consulta?.usernameTecnico
        }
      } else {
        return {}
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.interval)
    next();
  },
  mounted() {
    this.montarRegras();
    ConsultaService.buscarConsulta(this.id)
      .then(
        consulta => {
          if (consulta == null) {
            throw new Error("Consulta não encontrada")
          }
          if (!consulta.idUsuario) {
            this.$bvToast.toast("Essa consulta ainda não foi agendada", {
              title: 'Busca da consulta:',
              variant: 'danger',
              solid: true
            })

            setTimeout(() => {
              this.$router.push('/agenda/')
            }, 1000);
          }
          this.consulta = consulta;
          ConsultaService.buscarMensagens(this.id)
            .then(
              mensagens => {
                if (mensagens != null) {
                  this.mensagens = mensagens;
                }
              }
            )

        }
      )
      .catch(
        error => {
          let message = "Ocorreu um erro";
          if (error?.response?.data?.message) {
            message = error.response.data.message
          } else if (error?.message) {
            message = error.message;
          }
          this.$bvToast.toast(message, {
            title: 'Busca da consulta:',
            variant: 'danger',
            solid: true
          })

          setTimeout(() => {
            this.$router.push('/agenda/')
          }, 1000);
        }
      )
  }
}
</script>

<style scoped>

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
