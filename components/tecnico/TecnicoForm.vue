<template>
  <div>
    <h1 class="title" v-if="editar">
      Editar Técnico
    </h1>
    <h1 class="title" v-else>
      {{ usuarioCorrente.username }}, complete seu cadastro.
    </h1>


    <Tecnico :tecnico="tecnico"/>

    <b-button type="submit" variant="primary" v-if="editar" @click="editarTecnico">Editar</b-button>
    <b-button type="submit" variant="primary" v-else @click="salvarTecnico">Cadastrar</b-button>
    <b-button type="reset" variant="danger" @click="resetar">Limpar</b-button>
  </div>
</template>

<script>
import Tecnico from "@/components/tecnico/Tecnico";
import TecnicoModel from "@/components/tecnico/tecnico.model.js";

export default {
  name: "TecnicoForm",
  components: {Tecnico},
  props: ['editar', "tecnico"],
  methods: {
    salvarTecnico() {

      this.$store.dispatch('tecnicos.service/setTecnico', this.tecnico)
        .then(
          tecnicoSalvo => {
            this.$emit("update:tecnico", new TecnicoModel(tecnicoSalvo));
            this.$bvToast.toast('Técnico salvo com sucesso', {
              title: 'Novo técnico:',
              variant: 'success',
              solid: true
            })
            setTimeout(() => {
              this.$router.push('/tecnicos/' + tecnicoSalvo.id)
            }, 1000);
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
            title: 'Cadastro de técnico:',
            variant: 'danger',
            solid: true
          })
        }
      )
    },
    editarTecnico() {
      const url = `${process.env.backendApi}/tecnicos/`;
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(this.tecnico),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.accessToken
        }
      }).then(r => r.json())
        .then(tecnicoAtualizado => {
          this.$emit("update:tecnico", new TecnicoModel(tecnicoAtualizado));
          this.$bvToast.toast('Técnico atualizado com sucesso', {
            title: 'Edição do técnico:',
            variant: 'success',
            solid: true
          })
        })
        .catch(e => console.error(e))
    },
    resetar() {
      this.$emit("update:tecnico", new TecnicoModel());
    }
  },
  computed: {
    accessToken() {
      return this.$store.state.auth.accessToken;
    },
    usuarioCorrente() {
      return this.$store.state.auth.user;
    }
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

</style>
