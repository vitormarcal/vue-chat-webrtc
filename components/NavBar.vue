<template>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Gestão de Consulta</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/tecnicos">Técnicos</b-nav-item>
          <b-nav-item href="/agenda">Agendar</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>

nav {
  width: 100%;
  margin: 0;
  position: absolute;
  top: 0px;
  margin-bottom: 25px;

  display: flex;
}

</style>
