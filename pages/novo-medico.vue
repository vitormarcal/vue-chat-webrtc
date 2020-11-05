<template>
  <div class="container">
    <div>
      <h1 class="title">
        Novo Médico
      </h1>

      <b-form-group label="Nome Completo:" label-for="input-nome">
        <b-form-input
          id="input-nome"
          v-model="medico.nome"
          required
          placeholder="Seu nome">

        </b-form-input>
      </b-form-group>

      <b-form-group label="Especialidade:" label-for="input-especialidade">
        <b-form-select
          id="inline-form-custom-select-pref"
          class="mb-2 mr-sm-2 mb-sm-0"
          :options="especialidades"
          v-model="medico.especialidade"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Atendo na:" label-for="checkbox-dias-da-semana">
        <b-form-checkbox-group
          id="checkbox-dias-da-semana"
          v-model="medico.diasDaSemana"
          :options="diasDaSemana"
          name="flavour-1"
        ></b-form-checkbox-group>
      </b-form-group>

      <b-form-group label="Inicio os trabalhos às:" label-for="timepicker-inicio-atendimento">
        <b-form-timepicker id="timepicker-inicio-atendimento" v-model="medico.inicioAtendimento"
                           locale="en"></b-form-timepicker>
      </b-form-group>

      <b-form-group label="Saio para descanso às:" label-for="timepicker-fim-atendimento">
        <b-form-timepicker id="timepicker-fim-atendimento" v-model="medico.saidaDescanso"
                           locale="en"></b-form-timepicker>
      </b-form-group>

      <b-form-group label="Volto do descanso às:" label-for="naoEstouDisponivelDAs">
        <b-form-timepicker id="naoEstouDisponivelDAs" v-model="medico.voltaDescanso"
                           locale="en"></b-form-timepicker>
      </b-form-group>

      <b-form-group label="Finalizo o expediente  às:" label-for="naoEstouDisponivelAteAs">
        <b-form-timepicker id="naoEstouDisponivelAteAs" v-model="medico.fimAtendimento"
                           locale="en"></b-form-timepicker>

      </b-form-group>

      <b-button type="submit" variant="primary" @click="enviar">Submit</b-button>
      <b-button type="reset" variant="danger" @click="resetar">Reset</b-button>

    </div>
  </div>

</template>

<script>
class Medico {
  constructor() {
    this.nome = '';
    this.especialidade = null;
    this.diasDaSemana = [];
    this.inicioAtendimento = '';
    this.saidaDescanso = '';
    this.voltaDescanso = '';
    this.fimAtendimento = '';
  }
}

export default {
  name: "novo-medico",
  data() {
    return {
      medico: new Medico(),
      naoEstouDisponivelDAs: '',
      naoEstouDisponivelAteAs: '',
      especialidades: [
        {text: "Selecione uma especialidade", value: null},
        {text: 'Clínica Geral', value: 'CG'},
        {text: 'Ginecologia', value: 'GI'},
        {text: 'Pediatria', value: 'PE'}
      ],
      diasDaSemana: [
        {text: 'Segunda', value: 'segunda'},
        {text: 'Terça', value: 'terca'},
        {text: 'Quarta', value: 'quarta'},
        {text: 'Quinta', value: 'quinta'},
        {text: 'Sexta', value: 'sexta'},
        {text: 'Sabádo', value: 'sabado'},
        {text: 'Domingo', value: 'domingo'},
      ]

    }
  },
  methods: {
    enviar() {

    },
    resetar() {
      this.medico = new Medico();
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
