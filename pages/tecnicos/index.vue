<template>
  <div class="container">
    <TecnicoForm :tecnico.sync="tecnico" :editar="editar"></TecnicoForm>
  </div>

</template>

<script>
import TecnicoModel from "@/components/tecnico/tecnico.model.js";
import TecnicoForm from "@/components/tecnico/TecnicoForm";

export default {
  name: "index",
  middleware: 'autenticado',
  components: {TecnicoForm},
  data() {
    return {
      tecnico: new TecnicoModel(),
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
  margin: 5vh auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5vh;
}


</style>
