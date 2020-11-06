<template>
  <div class="container">
    <div>
      <h1 class="title">
        Novo Médico
      </h1>

      <Medico :medico="medico"/>

      <b-button type="submit" variant="primary" @click="enviar">Cadastrar</b-button>
      <b-button type="reset" variant="danger" @click="resetar">Limpar</b-button>

    </div>
  </div>

</template>

<script>
import Medico from "@/components/medico/Medico";
import MedicoModel from "@/components/medico/medico.model.js";

export default {
  name: "novo",
  components: {Medico},
  data() {
    return {
      medico: new MedicoModel(),
    }
  },
  methods: {
    enviar() {
      const url = `https://sismedicina.herokuapp.com/medicos`;
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(this.medico),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(r => r.json())
        .then(m => this.medico = new MedicoModel(m))
        .catch(e => console.error(e))
    },
    consultar() {
      if (this.id) {
        const url = `https://sismedicina.herokuapp.com/medicos/${this.id}`;
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(r => r.json())
          .then(m => this.medico = new MedicoModel(m))
          .catch(e => console.error(e))
      }

    },
    resetar() {
      this.medico = new MedicoModel();
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
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

</style>
