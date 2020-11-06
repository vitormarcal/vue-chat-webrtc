<template>
  <div class="container">
    <MedicoForm :medico.sync="medico" :editar="editar"></MedicoForm>
  </div>

</template>

<script>
import MedicoModel from "@/components/medico/medico.model.js";
import MedicoForm from "@/components/medico/MedicoForm";

export default {
  name: "index",
  middleware: 'autenticado',
  components: {MedicoForm},
  data() {
    return {
      medico: new MedicoModel(),
      editar: false,
    }
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
