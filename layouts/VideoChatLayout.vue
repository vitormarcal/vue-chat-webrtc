<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-main>
      <div class="main">
        <nuxt />
      </div>
    </v-main>
    <v-overlay :value="overlay">
      <p>
        <v-progress-circular
          indeterminate
          color="primary"
        />
        Conexão perdida com o server, tentando reconectar ...
      </p>
    </v-overlay>
  </v-app>
</template>

<style>
  .main {
    margin-top: 4vh;
    height: calc(100vh - 64px);
    width: 100vw;
    overflow-y: hidden;
  }
</style>

<script>
import { mapState } from 'vuex'
import NavBar from "../components/NavBar";

export default {
  components: {NavBar},
  data () {
    return {
      clipped: false,
      title: 'Video call 1-1'
    }
  },
  computed: mapState({
    name: state => state.setting.name,
    overlay: state => state.setting.overlay
  }),
  mounted () {
    this.$socket.on('reconnecting', () => {
      debugger
      this.$store.commit('setting/setOverlay', {
        overlay: true
      })
    })

    this.$socket.on('reconnect', () => {
      debugger
      this.$store.commit('setting/setOverlay', {
        overlay: false
      })
    })

    this.$socket.on('reconnect', () => {
      debugger
      this.$store.commit('setting/setOverlay', {
        overlay: false
      })
    })

    this.$socket.on('reject', (data) => {
      debugger
      this.$router.push('/error')
    })
  }
}
</script>
