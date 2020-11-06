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
  components: {MedicoForm},
  data() {
    return {
      medico: new MedicoModel(),
      editar: false,
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
