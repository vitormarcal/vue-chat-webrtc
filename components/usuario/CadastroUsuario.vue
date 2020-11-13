<template>

  <b-modal id="modal-cadastro-usuario" title="Cadastro de usuário" @ok="acao" :ok-disabled="!completo">
    <div>
      <h1 class="title">
        Novo Usuário
      </h1>

      <p class="subtitle">Campos obrigatórios * </p>

      <b-form-group label="Nome * :" label-for="input-nome">
        <b-form-input
          id="input-nome"
          :state="nomeState"
          v-model.trim="usuario.nome"
          required
          placeholder="Seu nome">

        </b-form-input>

      </b-form-group>

      <b-form-group label="Telefone:" label-for="input-telefone">
        <b-form-input
          id="input-telefone"
          type="tel"
          v-model="usuario.telefone"
          required
          placeholder="Seu telefone">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Escolha um nome de usuário  * :" label-for="input-username">
        <b-form-input
          v-model="usuario.username"
          :state="usernameState"
          id="input-username"
          type="email"
          required
          placeholder="Seu nome de usuário">

        </b-form-input>
      </b-form-group>

      <b-form-group label="Informe o email  * :" label-for="input-email">
        <b-form-input
          v-model="usuario.email"
          :state="emailState"
          id="input-email"
          type="email"
          required
          placeholder="Seu email">

        </b-form-input>
      </b-form-group>

      <b-form-group label="Você é um paciente ou um técnico?  * ">
        <b-form-radio v-model="usuario.tipo" name="some-radios" value="P">Paciente</b-form-radio>
        <b-form-radio v-model="usuario.tipo" name="some-radios" value="T">Técnico</b-form-radio>
      </b-form-group>

      <b-form-group label="Crie uma senha:  * " label-for="input-senha">
        <b-form-input
          v-model="usuario.password"
          :state="passwordState"
          id="input-senha"
          type="password"
          required
          placeholder="Senha">

        </b-form-input>
      </b-form-group>

    </div>
  </b-modal>

</template>

<script>

import UsuarioModel from "./usuario.model";

export default {
  name: "CadastroUsuario",
  data() {
    return {
      usuario: new UsuarioModel(),
    }
  },
  methods: {
    acao() {
      if (this.completo) {
        this.registrar();
      }

    },
    registrar() {
      this.$store.dispatch('auth/register', this.usuario).then(
        data => {
          this.$bvToast.toast(data.message, {
            title: 'Registrar:',
            variant: 'success',
            solid: true
          })
        },
        error => {
          let message = "Ocorreu um erro";
          if (error?.response?.data?.message) {
            message = error.response.data.message
          } else if (error?.message) {
            message = error.message;
          }
          this.$bvToast.toast(message, {
            title: 'Registrar:',
            variant: 'danger',
            solid: true
          })
        }
      );
    }
  },

  computed: {
    completo() {
      return !!(this.nomeState && this.usernameState && this.emailState && this.tipoState && this.passwordState);
    },
    nomeState() {
      if (this.usuario.nome == null) {
        return null
      }
      return this.usuario.nome?.length > 2
    },
    usernameState() {
      if (this.usuario.username == null) {
        return null
      }
      return this.usuario.username?.length > 2
    },
    emailState() {
      if (this.usuario.email == null) {
        return null
      }
      return this.usuario.email?.length > 6
    },
    tipoState() {
      if (this.usuario.tipo == null) {
        return null
      }
      return this.usuario.tipo === 'P' || this.usuario.tipo === 'T'
    },
    passwordState() {
      if (this.usuario.password == null) {
        return null
      }
      return this.usuario.password?.length > 6
    },
  }
}
</script>

<style scoped>

</style>
