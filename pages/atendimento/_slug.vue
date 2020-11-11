<template>
  <b-container class="container">
    <div>
      <h1 class="title">
        Chat de Teleatendimento
      </h1>

      <p class="subtitle" v-show="this.consulta">
        Você está no atendimento agendado para a especialidade {{ this.tituloChat }}
      </p>

      <chat :to="destinatario" :id-consulta="this.id" :title="this.tituloChat" :from="this.usuarioCorrente" :iniciar-em="this.dataConsulta"></chat>

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
    }
  },
  async asyncData({params}) {
    const id = params.slug;
    return {id}
  },
  computed: {
    usuarioCorrente() {
      return this.$store.state.auth.user;
    },
    tituloChat() {
      return this.consulta?.especialidade;
    },
    dataConsulta() {
      if (this.consulta?.dataConsulta) {
        return new Date(this.consulta.dataConsulta);
      }
      return null;
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
  mounted() {
    ConsultaService.buscarConsulta(this.id)
      .then(
        consulta => {
          if (consulta == null) {
            throw new Error("Consulta não encontrada")
          }
          this.consulta = consulta;
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
            this.$router.push('/agenda/' )
          },1000);
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
