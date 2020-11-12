<template>
  <b-container class="container">

    <div>
      <h1 class="title">
        Agenda para Teleatendimento {{this.tipoUser}}
      </h1>

      <p class="subtitle">
        Essa agenda é destinada para pessoas que desejam o atendimento on-line
      </p>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "index",
  async asyncData({params}) {
    const tipoUser = params.slug;
    return {tipoUser}
  },
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

.links a {
  padding: 5px 5px;
  margin-left: 0;
}


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
