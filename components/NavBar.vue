<template>
  <b-navbar toggleable="lg" type="dark" variant="info" v-if="this.logado" class="bg-navbar">
    <b-navbar-brand href="#">Gestão de Consulta</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <template v-for="item in links">
          <b-nav-item :href="item.link" v-if="item.active">{{ item.label }}</b-nav-item>
        </template>
        <b-nav-item v-if="logado" href="#" @click="sair">Sair</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

</template>

<script>
export default {
  name: "NavBar",
  methods: {
    sair() {
      this.$store.dispatch("auth/logout")
      this.$router.push("/")
    }
  },
  computed: {
    usuario() {
      return this.$store.state.auth.user
    },
    logado() {
      return this.$store.state.auth.logado || true
    },
    links() {
      return [
        {
          link: '/tecnicos',
          label: 'Técnicos',
          active: this.logado && this.usuario?.includes('A')
        },
        {
          link: '/tecnicos/' + this.usuario?.tecnicoId,
          label: 'Perfil',
          active: this.logado && this.usuario?.includes('T')
        },
        {
          link: '/agenda',
          label: 'Agendar',
          active: this.logado
        },
        {
          link: '/agenda/itens/',
          label: 'Minhas marcações',
          active: this.logado
        },
      ];
    }
  }
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

.bg-navbar {
  background-color: rgba(27,27,27,1) !important;
}

</style>
