<template>
  <div>
    <h1 class="title" v-if="editar">
      Cadastro do @{{ usuarioCorrente.username }}
    </h1>
    <h1 class="title" v-else>
      @{{ usuarioCorrente.username }}, complete seu cadastro.
    </h1>

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
        <b-form-input type="number" id="duracaoAtendimento"
                      :state="duracaoAtendimentoState"
                      v-model="tecnico.duracaoAtendimento"
                      locale="pt-BR"></b-form-input>

      </b-form-group>

      <b-form-group label="Inicio os trabalhos às:" label-for="inicioAtendimento">
        <b-form-timepicker id="inicioAtendimento" v-model="tecnico.inicioAtendimento"
                           :label-close-button="'Fechar'"
                           :label-no-time-selected="'Selecione um horário'"
                           locale="pt-BR"></b-form-timepicker>
      </b-form-group>
      <b-form-group label="Saio para descanso às:" label-for="saidaDescanso">
        <b-form-timepicker id="saidaDescanso" v-model="tecnico.saidaDescanso"
                           :label-close-button="'Fechar'"
                           :label-no-time-selected="'Selecione um horário'"
                           locale="pt-BR"></b-form-timepicker>
      </b-form-group>
      <b-form-group label="Volto do descanso às:" label-for="voltaDescanso">
        <b-form-timepicker id="voltaDescanso" v-model="tecnico.voltaDescanso"
                           :label-close-button="'Fechar'"
                           :label-no-time-selected="'Selecione um horário'"
                           locale="pt-BR"></b-form-timepicker>
      </b-form-group>
      <b-form-group label="Finalizo o expediente  às:" label-for="fimAtendimento">
        <b-form-timepicker id="fimAtendimento" v-model="tecnico.fimAtendimento"
                           :label-close-button="'Fechar'"
                           :label-no-time-selected="'Selecione um horário'"
                           locale="pt-BR"></b-form-timepicker>

      </b-form-group>

      <b-button type="submit" variant="primary" v-if="editar" @click="editarTecnico">Editar</b-button>
      <b-button type="submit" variant="primary" v-else @click="salvarTecnico">Cadastrar</b-button>
      <b-button type="reset" variant="danger" @click="resetar">Limpar</b-button>
    </div>
  </div>
</template>

<script>
import TecnicoModel from "@/components/tecnico/tecnico.model.js";
import SelecaoEspecialidades from "./SelecaoEspecialidades";

export default {
  name: "TecnicoForm",
  components: {SelecaoEspecialidades},
  props: ['editar', "tecnico"],
  data() {
    return {
      diasDaSemana: [
        {text: 'Segunda', value: 'SEGUNDA'},
        {text: 'Terça', value: 'TERCA'},
        {text: 'Quarta', value: 'QUARTA'},
        {text: 'Quinta', value: 'QUINTA'},
        {text: 'Sexta', value: 'SEXTA'},
        {text: 'Sabádo', value: 'SABADO'},
        {text: 'Domingo', value: 'DOMINGO'},
      ],
    }
  },
  methods: {
    salvarTecnico() {

      if (!this.tecnico.horariosValidos()) {
        this.$bvToast.toast('Horários inválios', {
          title: 'Cadastro de técnico:',
          variant: 'danger',
          solid: true
        })
        return;
      }
      this.$store.dispatch('tecnicos/criar', this.tecnico)
        .then(
          tecnicoSalvo => {
            this.$store.dispatch('auth/setCadastroCompleto')
            this.$bvToast.toast('Técnico salvo com sucesso', {
              title: 'Novo técnico:',
              variant: 'success',
              solid: true
            })
            setTimeout(() => {
              this.$router.push('/tecnicos/' + tecnicoSalvo.id)
            }, 1000);
          }
        ).catch(
        error => {
          let message = "Ocorreu um erro";
          if (error?.response?.data?.message) {
            message = error.response.data.message
          } else if (error?.message) {
            message = error.message;
          }
          this.$bvToast.toast(message, {
            title: 'Cadastro de técnico:',
            variant: 'danger',
            solid: true
          })
        }
      )
    },
    editarTecnico() {
      if (!this.tecnico.horariosValidos()) {
        this.$bvToast.toast('Horários inválios', {
          title: 'Cadastro de técnico:',
          variant: 'danger',
          solid: true
        })
        return;
      }
      this.$store.dispatch('tecnicos/editar', this.tecnico)
        .then(
          tecnicoSalvo => {
            this.$bvToast.toast('Técnico atualizado com sucesso', {
              title: 'Atualização do técnico:',
              variant: 'success',
              solid: true
            })
            setTimeout(() => {
              this.$router.push('/tecnicos/' + tecnicoSalvo.id)
            }, 1000);
          }
        ).catch(
        error => {
          let message = "Ocorreu um erro";
          if (error?.response?.data?.message) {
            message = error.response.data.message
          } else if (error?.message) {
            message = error.message;
          }
          this.$bvToast.toast(message, {
            title: 'Cadastro de técnico:',
            variant: 'danger',
            solid: true
          })
        }
      )
    },
    resetar() {
      this.$emit("update:tecnico", new TecnicoModel({id: this.tecnico.id}));
    }
  },
  computed: {
    duracaoAtendimentoState() {
      if (this.tecnico.duracaoAtendimento == null) {
        return null
      }
      return this.tecnico.duracaoAtendimento > 5
    },
    accessToken() {
      return this.$store.state.auth.accessToken;
    },
    usuarioCorrente() {
      return this.$store.state.auth.user;
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
  font-size: 32px;
  color: #35495e;
  letter-spacing: 1px;
}

</style>
