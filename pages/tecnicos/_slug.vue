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
    async consultar() {
      const url = `${process.env.backendApi}/tecnicos/${this.id}`;
      const resposta = await this.$axios.get(url, {
        headers: {
          'Authorization': this.usuarioCorrente?.accessToken
        }
      });
      this.tecnico = new TecnicoModel(resposta.data);
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
