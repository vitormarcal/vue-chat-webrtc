<template>
  <b-form-group label="Especialidade:" label-for="input-especialidade">
    <b-form-select
      id="inline-form-custom-select-pref"
      class="mb-2 mr-sm-2 mb-sm-0"
      :options="lista"
      @change="change"
      v-model="valor"
    ></b-form-select>
  </b-form-group>
</template>

<script>
export default {
  name: "SelecaoEspecialidades",
  props: ['especialidade'],
  methods: {
    change(value) {
      console.log("selecionou")
      this.$emit('change', value)
    }
  },
  computed: {
    lista() {
      const lista = [];
      lista.push({text: "Selecione uma especialidade", value: null})
      this.$store.state.especialidades.lista.forEach(item => {
        lista.push({text: item.descricao, value: item.id})
      });
      return lista
    },
    valor: {
      get: function () {
        this.especialidade
      },
      set: function (newValue) {
        this.$emit('update:especialidade', newValue)
      }
    }
  },
  created() {
    this.$store.dispatch("especialidades/setEspecialidades")
  }
}
</script>

<style scoped>

</style>
