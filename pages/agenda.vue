<template>
  <div class="container">

    <div>
      <selecao-especialidades></selecao-especialidades>

      <b-form-group label="Escolha o dia:">
        <b-col md="auto">
          <b-calendar v-model="diaDaConsulta" locale="en-US"></b-calendar>
        </b-col>
      </b-form-group>


    </div>
  </div>
</template>

<script>
import SelecaoEspecialidades from "../components/tecnico/SelecaoEspecialidades";

export default {
  name: "agenda.vue",
  components: {SelecaoEspecialidades},
  middleware: 'autenticado',
  data() {
    return {
      diaDaConsulta: null
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
