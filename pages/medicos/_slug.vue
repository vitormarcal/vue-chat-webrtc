<template>
  <div class="container">
    <MedicoForm :medico="medico"></MedicoForm>
  </div>
</template>

<script>
import MedicoModel from "@/components/medico/medico.model.js";
import MedicoForm from "@/components/medico/MedicoForm";

export default {
  components: {MedicoForm},
  async asyncData({params}) {
    const id = params.slug
    return {id}
  },
  data() {
    return {
      medico: new MedicoModel(),
    }
  },
  created() {
    this.consultar()
  },
  methods: {
    consultar() {
      if (this.id) {
        const url = `${process.env.backendApi}/medicos/${this.id}`;
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(r => r.json())
          .then(m => this.medico = new MedicoModel(m))
          .catch(e => console.error(e))
      }

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
