<template>
  <div class="container">
    <div>
      <Logo/>
      <h1 class="title">
        Sistema de Gestão de Consultas
      </h1>
      <div class="links">

        <b-form-group label="Nome de usuário:" label-for="input-login-username">
          <b-form-input
            id="input-login-username"
            type="text"
            v-model="user.username"
            required
            placeholder="Seu nome de usuário">

          </b-form-input>
        </b-form-group>

        <b-form-group label="Senha:" label-for="input-login-senha">
          <b-form-input
            id="input-login-senha"
            v-model="user.password"
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


      <b-modal id="modal-cadastro-usuario" title="Cadastro de usuário" @ok="registrar">
        <cadastro-usuario :usuario="user"></cadastro-usuario>
      </b-modal>
    </div>
  </div>
</template>

<script>
import CadastroUsuario from "../components/usuario/CadastroUsuario";

import UsuarioModel from "../components/usuario/usuario.model";

export default {
  components: {CadastroUsuario},
  data() {
    return {
      user: new UsuarioModel(),
    }
  },
  methods: {
    entrar() {
      if (this.user.username && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
          () => {
            this.$router.push('/tecnicos');
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
    registrar() {
      this.$store.dispatch('auth/register', this.user).then(
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
    loggedIn() {
      return this.$store.state.auth.logado;
    },
    user() {
      return this.$store.state.auth.user;
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
