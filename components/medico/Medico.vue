<template>
  <div>
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
  </div>

</template>
<script>
export default {
  name: 'Medico',
  props: ['medico'],
  data() {
    return {
      diasDaSemana: [
        {text: 'Segunda', value: 'SEGUNDA'},
        {text: 'Terça', value: 'TERCA'},
        {text: 'Quarta', value: 'QUARTA'},
        {text: 'Quinta', value: 'QUINTA'},
        {text: 'Sexta', value: 'SEXTA'},
        {text: 'Sabádo', value: 'SABADAO'},
        {text: 'Domingo', value: 'DOMINGO'},
      ],
      especialidades: [
        {text: "Selecione uma especialidade", value: null},
        {text: 'Clínica Geral', value: 'CG'},
        {text: 'Ginecologia', value: 'GI'},
        {text: 'Pediatria', value: 'PE'}
      ],
    }
  },
}
</script>
