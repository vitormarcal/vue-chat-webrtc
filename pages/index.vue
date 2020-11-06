<template>
  <div class="container">
    <div>
      <Logo/>
      <h1 class="title">
        Sistema de Gestão de Consultas
      </h1>
      <div class="links">

        <b-form-group label="Email:" label-for="input-email">
          <b-form-input
            id="input-email"
            type="email"
            required
            placeholder="Seu email">

          </b-form-input>
        </b-form-group>

        <b-form-group label="Senha:" label-for="input-senha">
          <b-form-input
            id="input-senha"
            type="password"
            required
            placeholder="Senha">

          </b-form-input>
        </b-form-group>

        <a href="#" class="button--green">
          Entrar
        </a>
        <a href="#" class="button--grey" v-b-modal.modal-cadastro-usuario>
          Cadastrar
        </a>
      </div>


      <b-modal id="modal-cadastro-usuario" title="Cadastro de usuário">
        <cadastro-usuario></cadastro-usuario>
      </b-modal>
    </div>
  </div>
</template>

<script>
import CadastroUsuario from "../components/usuario/CadastroUsuario";

export default {
  components: {CadastroUsuario},
  data() {
    return {}
  },
  methods: {

  }
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

.links {
  padding-top: 15px;
}
</style>
