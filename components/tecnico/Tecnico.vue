<template>
  <div>
    <selecao-especialidades :especialidade.sync="tecnico.idEspecialidade"></selecao-especialidades>


    <b-form-group label="Atendo na:" label-for="checkbox-dias-da-semana">
      <b-form-checkbox-group
        id="checkbox-dias-da-semana"
        v-model="tecnico.diasQueAtende"
        :options="diasDaSemana"
        name="flavour-1"
      ></b-form-checkbox-group>
    </b-form-group>

    <b-form-group label="Meus atendimentos duram (min):" label-for="duracaoAtendimento">
      <b-form-input type="number" id="duracaoAtendimento" v-model="tecnico.duracaoAtendimento"
                         locale="en"></b-form-input>

    </b-form-group>

    <b-form-group label="Inicio os trabalhos às:" label-for="inicioAtendimento">
      <b-form-timepicker id="inicioAtendimento" v-model="tecnico.inicioAtendimento"
                         locale="en"></b-form-timepicker>
    </b-form-group>
    <b-form-group label="Saio para descanso às:" label-for="saidaDescanso">
      <b-form-timepicker id="saidaDescanso" v-model="tecnico.saidaDescanso"
                         locale="en"></b-form-timepicker>
    </b-form-group>
    <b-form-group label="Volto do descanso às:" label-for="voltaDescanso">
      <b-form-timepicker id="voltaDescanso" v-model="tecnico.voltaDescanso"
                         locale="en"></b-form-timepicker>
    </b-form-group>
    <b-form-group label="Finalizo o expediente  às:" label-for="fimAtendimento">
      <b-form-timepicker id="fimAtendimento" v-model="tecnico.fimAtendimento"
                         locale="en"></b-form-timepicker>

    </b-form-group>
  </div>

</template>
<script>
import SelecaoEspecialidades from "./SelecaoEspecialidades";

export default {
  name: 'Tecnico',
  components: {SelecaoEspecialidades},
  props: ['tecnico'],
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
    }
  },
}
</script>
