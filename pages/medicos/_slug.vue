<template>
  <div class="container">
    <MedicoForm :medico.sync="medico"></MedicoForm>
  </div>
</template>

<script>
import MedicoModel from "@/components/medico/medico.model.js";
import MedicoForm from "@/components/medico/MedicoForm";

export default {
  components: {MedicoForm},
  async asyncData({params, $axios, redirect}) {
    const id = params.slug;
    const url = `${process.env.backendApi}/medicos/${id}`;
    const resposta = await $axios.get(url);
    const medico = new MedicoModel(resposta.data);
    return {medico}
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
