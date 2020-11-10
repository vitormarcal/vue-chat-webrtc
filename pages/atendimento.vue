<template>
  <b-container class="container">
    <div>
      <h1 class="title">
        Chat de Teleatendimento
      </h1>

      <p class="subtitle">
        Aguarde para ser atendido
      </p>

      <chat>s</chat>

    </div>
  </b-container>
</template>

<script>
import Chat from "../components/atendimento/Chat";
export default {
  name: "atendimento",
  middleware: ['autenticado', 'cadastro-incompleto'],
  components: {Chat}
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
