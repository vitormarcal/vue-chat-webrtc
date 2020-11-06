<template>
  <div>
    <h1 class="title" v-if="editar">
      Editar Médico
    </h1>
    <h1 class="title" v-else>
      Novo Médico
    </h1>


    <Medico :medico="medico"/>

    <b-button type="submit" variant="primary" @click="enviar">Cadastrar</b-button>
    <b-button type="reset" variant="danger" @click="resetar">Limpar</b-button>
  </div>
</template>

<script>
import Medico from "@/components/medico/Medico";
import MedicoModel from "@/components/medico/medico.model.js";

export default {
  name: "MedicoForm",
  components: {Medico},
  props: ['editar'],
  data() {
    return {
      medico: new MedicoModel(),
    }
  },
  methods: {
    enviar() {
      const url = `${process.env.backendApi}/medicos/`;
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(this.medico),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(r => r.json())
        .then(medicoSalvo => {
          this.$emit("update:medico", new MedicoModel(medicoSalvo));
          this.$bvToast.toast('Médico salvo com sucesso', {
            title: 'Novo médico:',
            variant: 'success',
            solid: true
          })
        })
        .catch(e => console.error(e))
    },
    resetar() {
      this.$emit("update:medico", new MedicoModel());
    }
  }
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
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

</style>
