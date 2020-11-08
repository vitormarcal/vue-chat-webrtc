<template>
  <div class="container">
    <TecnicoForm :tecnico.sync="tecnico" :editar="true"></TecnicoForm>
  </div>
</template>

<script>
import TecnicoModel from "@/components/tecnico/tecnico.model.js";
import TecnicoForm from "@/components/tecnico/TecnicoForm";

export default {
  components: {TecnicoForm},
  middleware: ['autenticado', 'cadastro-incompleto'],
  data() {
    return {
      tecnico: new TecnicoModel()
    }
  },
  async asyncData({params}) {
    const id = params.slug;
    return {id}
  },
  methods: {
    consultar() {
      this.$store.dispatch('tecnicos/buscar', this.id)
        .then(
          tecnicoSalvo => {
            this.tecnico = new TecnicoModel(tecnicoSalvo);
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
            title: 'Busca de técnico:',
            variant: 'danger',
            solid: true
          })
        }
      )
    }
  },
  created() {
    this.consultar()
  },
  computed: {
    usuarioCorrente() {
      return this.$store.state.auth.user;
    }
  }
}
</script>

<style scoped>

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}


</style>
