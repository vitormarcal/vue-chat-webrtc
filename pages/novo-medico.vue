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
          v-model="medico.diasQueAtende"
          :options="diasDaSemana"
          name="flavour-1"
        ></b-form-checkbox-group>
      </b-form-group>

      <b-form-group label="Inicio os trabalhos às:" label-for="inicioAtendimento">
        <b-form-timepicker id="inicioAtendimento" v-model="medico.inicioAtendimento"
                           locale="en"></b-form-timepicker>
      </b-form-group>

      <b-form-group label="Saio para descanso às:" label-for="saidaDescanso">
        <b-form-timepicker id="saidaDescanso" v-model="medico.saidaDescanso"
                           locale="en"></b-form-timepicker>
      </b-form-group>

      <b-form-group label="Volto do descanso às:" label-for="voltaDescanso">
        <b-form-timepicker id="voltaDescanso" v-model="medico.voltaDescanso"
                           locale="en"></b-form-timepicker>
      </b-form-group>

      <b-form-group label="Finalizo o expediente  às:" label-for="fimAtendimento">
        <b-form-timepicker id="fimAtendimento" v-model="medico.fimAtendimento"
                           locale="en"></b-form-timepicker>

      </b-form-group>

      <b-button type="submit" variant="primary" @click="enviar">Submit</b-button>
      <b-button type="reset" variant="danger" @click="resetar">Reset</b-button>

    </div>
  </div>

</template>

<script>
class Medico {
  constructor(data) {
    this.id = data?.id;
    this.nome = data?.nome;
    this.especialidade = null;
    this.diasQueAtende = data?.diasQueAtende?.split(',');
    this.inicioAtendimento = data?.inicioAtendimento;
    this.saidaDescanso = data?.saidaDescanso;
    this.voltaDescanso = data?.voltaDescanso;
    this.fimAtendimento = data?.fimAtendimento;
  }
}

export default {
  name: "novo-medico",
  data() {
    return {
      id: this.$route.params.id,
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
        {text: 'Segunda', value: 'SEGUNDA'},
        {text: 'Terça', value: 'TERCA'},
        {text: 'Quarta', value: 'QUARTA'},
        {text: 'Quinta', value: 'QUINTA'},
        {text: 'Sexta', value: 'SEXTA'},
        {text: 'Sabádo', value: 'SABADAO'},
        {text: 'Domingo', value: 'DOMINGO'},
      ]

    }
  },
  methods: {
    enviar() {
      fetch('http://localhost:8080/medicos', {
        method: 'POST',
        body: JSON.stringify(this.medico),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(r => r.json())
        .then(m => this.medico = new Medico(m))
        .catch(e => console.error(e))
    },
    consultar() {
      if (this.id) {
        fetch('http://localhost:8080/medicos/' + this.id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(r => r.json())
          .then(m => this.medico = new Medico(m))
          .catch(e => console.error(e))
      }

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
