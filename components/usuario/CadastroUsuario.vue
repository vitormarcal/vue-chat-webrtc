<template>

  <div>
    <h1 class="title">
      Novo Usuário
    </h1>

    <b-form-group label="Nome:" label-for="input-nome">
      <b-form-input
        id="input-nome"
        v-model="usuario.nome"
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

    <b-form-group label="Escolha um nome de usuário:" label-for="input-username">
      <b-form-input
        v-model="usuario.username"
        id="input-username"
        type="email"
        required
        placeholder="Seu nome de usuário">

      </b-form-input>
    </b-form-group>

    <b-form-group label="Informe o email:" label-for="input-email">
      <b-form-input
        v-model="usuario.email"
        id="input-email"
        type="email"
        required
        placeholder="Seu email">

      </b-form-input>
    </b-form-group>

    <b-form-group label="Você é um paciente ou um técnico?">
      <b-form-radio v-model="usuario.tipo" name="some-radios" value="P">Paciente</b-form-radio>
      <b-form-radio v-model="usuario.tipo" name="some-radios" value="T">Técnico</b-form-radio>
    </b-form-group>

    <b-form-group label="Crie uma senha:" label-for="input-senha">
      <b-form-input
        v-model="usuario.password"
        id="input-senha"
        type="password"
        required
        placeholder="Senha">

      </b-form-input>
    </b-form-group>

  </div>

</template>

<script>

export default {
  name: "CadastroUsuario",
  props: ['usuario']
}
</script>

<style scoped>

</style>
