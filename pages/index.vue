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

        <a href="https://nuxtjs.org/" class="button--green">
          Entrar
        </a>
        <a href="https://github.com/nuxt/nuxt.js" class="button--grey">
          Cadastrar
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
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
