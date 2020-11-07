<template>
  <b-form-group label="Especialidade:" label-for="input-especialidade">
    <b-form-select
      id="inline-form-custom-select-pref"
      class="mb-2 mr-sm-2 mb-sm-0"
      :options="lista"
      v-model="valor"
    ></b-form-select>
  </b-form-group>
</template>

<script>
export default {
  name: "SelecaoEspecialidades",
  props: ['especialidade'],
  data() {
    return {
      lista: [
        {text: "Selecione uma especialidade", value: null},
        {text: 'Saúde da mulher', value: 'smu'},
        {text: 'Saúde mental', value: 'sme'},
        {text: 'Primeiro socorros', value: 'ps'},
        {text: 'Covid-19', value: 'c19'},
        {text: 'Saúde do idoso', value: 'sid'},
        {text: 'Saúde do adulto', value: 'sad'},
        {text: 'Saúde da criança e adolescente', value: 'sec'},
      ],
    }
  },
  computed: {
    valor: {
      get: function () {
        this.especialidade
      },
      set: function(newValue) {
        this.$emit('update:especialidade', newValue)
      }
    }
  }
}
</script>

<style scoped>

</style>
