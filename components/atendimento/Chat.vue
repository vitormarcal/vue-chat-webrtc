<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Você está conversando com @{{to.nome}}</h3>
        <hr>
      </div>
      <div class="card-body">
        <div class="messages" v-for="(msg, index) in messages" :key="index">
          <p><span class="font-weight-bold">{{msg.time}} {{ msg.from }}: </span>{{ msg.text }}</p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <b-form-group label="Você: " label-for="input-mensagem">
          <b-form-input
            v-model="message"
            id="input-mensagem"
            required
            placeholder="Digite uma mensangem">

          </b-form-input>
        </b-form-group>
        <button type="submit" class="btn btn-success">Send</button>
      </form>
    </div>
  </div>
</template>
<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: "Chat",
  props: ['to', 'title'],
  data() {
    return {
      message: '',
      messages: [],
      sessionId: null
    }
  },
  methods: {
    connect() {
      const url = `${process.env.backendApi}/secured/room?access_token=${this.usuarioCorrente.accessToken}`;
      this.socket = new SockJS(url);
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {

          let sessionId = this.stompClient.ws._transport.url;
          sessionId = sessionId.replace(`${process.env.ws}/secured/room`, "");
          sessionId = sessionId.replace(`/websocket?access_token=${this.usuarioCorrente.accessToken}`, '');
          sessionId = sessionId.replace(/\/[0-9]+\//, "");
          console.log("Your current session is: " + sessionId);
          this.sessionId = sessionId

          this.connected = true;
          this.stompClient.subscribe(
            `/secured/room/queue-user${sessionId}`,
            evento => {
              this.messages.push(JSON.parse(evento.body))
            });
        },
        error => {
          console.log(error);
          this.connected = false;
        }
      );


    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
    tickleConnection() {
      if (!this.connected) {
        setTimeout(() => {
          console.log("Vou tentar conectar ao websocket em 2s!")
          this.connected = true;
          this.connect();
        }, 2000);

      }
    },
    sendMessage(e) {
      e.preventDefault();
      const agora = new Date();
      const time = `${agora.getHours()}:${agora.getMinutes()}`
      let msg = {
        from: this.usuarioCorrente.username,
        to: this.to.nome,
        text: this.message,
        time: time
      };
      this.messages.push(msg)
      this.stompClient.send('/secured/room', JSON.stringify(msg), {});
      this.message = ''
    }
  },
  computed: {
    usuarioCorrente() {
      return this.$store.state.auth.user;
    }
  },
  created() {
    this.tickleConnection()
  },
  watch: {
    connected() {
      this.tickleConnection()
    }
  }
}
</script>

<style scoped>

</style>
