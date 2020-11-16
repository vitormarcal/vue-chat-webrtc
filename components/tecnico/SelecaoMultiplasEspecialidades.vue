<template>
  <div>
    <b-form-group label="Informe suas especialidades: ">

      <b-form-tags v-model="value" size="lg"
                   @input="add"
                   add-on-change no-outer-focus class="mb-2">
        <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
            <li v-for="tag in tags" :key="tag" class="list-inline-item">
              <b-form-tag
                @remove="removeTag(tag)"
                :title="tag"
                :disabled="disabled"
                variant="info"
              >{{ tag }}
              </b-form-tag>
            </li>
          </ul>
          <b-form-select
            v-bind="inputAttrs"
            v-on="inputHandlers"
            :disabled="disabled || availableOptions.length === 0"
            :options="availableOptions"
          >
            <template #first>
              <!-- This is required to prevent bugs with Safari -->
              <option disabled value="">Informe uma especialidade...</option>
            </template>
          </b-form-select>
        </template>
      </b-form-tags>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'SelecaoMultiplasEspecialidades',
  props: ['carga'],
  data() {
    return {
      value: []
    }
  },
  methods: {
    add(value) {
      this.$emit('update:especialidades', value)
    }
  },
  created() {
    this.$store.dispatch("especialidades/setEspecialidades")
  },
  computed: {
    options() {
      return this.$store.state.especialidades.lista.map(item => item.descricao)
    },
    availableOptions() {
      return this.options.filter(opt => this.value.indexOf(opt) === -1)
    }
  },
  watch: {
    carga() {
      this.value = this.carga;
    }
  }
}
</script>
