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
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.main {
  margin-top: 4vh;
  height: calc(100vh - 64px);
  width: 100vw;
  overflow-y: hidden;
}

.container-page {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}


.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
<script>
import CHeader from "../components/Header";
import NavBar from "../components/NavBar";
import {mapState} from "vuex";

export default {
  components: {NavBar, CHeader},
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
