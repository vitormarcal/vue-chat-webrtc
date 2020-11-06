<template>

  <div>
    <h1 class="title">
      Novo Usuário
    </h1>

    <b-form-group label="Informe o email:" label-for="input-email">
      <b-form-input
        v-model="usuario.email"
        id="input-email"
        type="email"
        required
        placeholder="Seu email">

      </b-form-input>
    </b-form-group>

    <b-form-group label="Você é um paciente ou um médico?">
      <b-form-radio v-model="usuario.tipo" name="some-radios" value="P">Paciente</b-form-radio>
      <b-form-radio v-model="usuario.tipo" name="some-radios" value="M">Médico</b-form-radio>
    </b-form-group>

    <b-form-group label="Crie uma senha:" label-for="input-senha">
      <b-form-input
        v-model="usuario.senha"
        id="input-senha"
        type="password"
        required
        placeholder="Senha">

      </b-form-input>
    </b-form-group>

    <b-form-group label="Repita a senha:" label-for="input-senha-repete">
      <b-form-input
        v-model="usuario.repeteSenha"
        id="input-senha-repete"
        type="password"
        required
        placeholder="Repita a Senha">

      </b-form-input>
    </b-form-group>

  </div>

</template>

<script>
import UsuarioModel from "./usuario.model";

export default {
  name: "CadastroUsuario",
  data() {
    return {
      usuario: new UsuarioModel()
    }
  },
  methods: {
    cadastrar() {

    }
  }
}
</script>

<style scoped>

</style>
