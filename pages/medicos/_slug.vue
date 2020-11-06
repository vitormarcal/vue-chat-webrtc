<template>
  <div class="container">
    <MedicoForm :medico.sync="medico" :editar="true"></MedicoForm>
  </div>
</template>

<script>
import MedicoModel from "@/components/medico/medico.model.js";
import MedicoForm from "@/components/medico/MedicoForm";

export default {
  components: {MedicoForm},
  middleware: 'autenticado',
  data() {
    return {
      medico: new MedicoModel()
    }
  },
  async asyncData({params}) {
    const id = params.slug;
    return {id}
  },
  methods: {
    async consultar() {
      const url = `${process.env.backendApi}/medicos/${this.id}`;
      const resposta = await this.$axios.get(url, {
        headers: {
          'Authorization': this.usuarioCorrente?.accessToken
        }
      });
      this.medico = new MedicoModel(resposta.data);
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
