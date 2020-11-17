<template>
  <div class="container">
    <div>
      <Logo/>
      <h1 class="title">
        Teleatendimento
      </h1>
      <div class="links">

        <b-form-group label="Nome de usuário:" label-for="input-login-username">
          <b-form-input
            id="input-login-username"
            type="text"
            v-model="usuario.username"
            :state="usernameState"
            autofocus
            required
            placeholder="Seu nome de usuário">

          </b-form-input>
        </b-form-group>

        <b-form-group label="Senha:" label-for="input-login-senha">
          <b-form-input
            id="input-login-senha"
            v-model="usuario.password"
            :state="passwordState"
            type="password"
            required
            placeholder="Senha">

          </b-form-input>
        </b-form-group>

        <a href="#" class="button--green" @click="entrar">
          Entrar
        </a>
        <a href="#" class="button--grey" v-b-modal.modal-cadastro-usuario>
          Cadastrar
        </a>
      </div>


      <cadastro-usuario></cadastro-usuario>

    </div>
  </div>
</template>

<script>
import CadastroUsuario from "../components/usuario/CadastroUsuario";

import UsuarioModel from "../components/usuario/usuario.model";

export default {
  components: {CadastroUsuario},
  layout: 'inicio',
  data() {
    return {
      usuario: new UsuarioModel(),
    }
  },
  methods: {
    entrar() {
      if (this.usernameState && this.passwordState) {
        this.$store.dispatch('auth/login', this.usuario).then(
          () => {
            this.$router.push('/agenda');
          },
          error => {
            let message = "Ocorreu um erro";
            if (error?.response?.data?.message) {
              message = error.response.data.message
            } else if (error?.response?.status === 401) {
              message = "Usuário ou senha inválidos";
            } else if (error?.message) {
              message = error.message;
            }
            this.$bvToast.toast(message, {
              title: 'Entrar:',
              variant: 'danger',
              solid: true
            })
          }
        );
      }

    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.logado;
    },
    usuarioLogado() {
      return this.$store.state.auth.user;
    },
    usernameState() {
      if (this.usuario.username == null) {
        return null
      }
      return this.usuario.username?.length > 2
    },
    passwordState() {
      if (this.usuario.password == null) {
        return null
      }
      return this.usuario.password?.length > 6
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/agenda');
    }
  },
}
</script>

<style>
.container {
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
  font-size: 32px;
  color: #35495e;
  letter-spacing: 1px;
  margin-top: 2vh;
}

.links {
  margin-top: 10vh;
}
</style>
