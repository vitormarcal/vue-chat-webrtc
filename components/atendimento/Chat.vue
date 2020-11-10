<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Group</h3>
        <hr>
      </div>
      <div class="card-body">
        <div class="messages" v-for="(msg, index) in messages" :key="index">
          <p><span class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}</p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="gorm-group">
          @{{ usuarioCorrente.username }}
        </div>
        <div class="gorm-group pb-3">
          <label for="message">Message:</label>
          <input type="text" v-model="message" class="form-control">
        </div>
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
          this.stompClient.subscribe('secured/user/queue/specific-user',
            evento => {
              debugger
              const ev = JSON.parse(evento);
              console.log("Evento: " + JSON.parse(evento));
              this.messages.push(ev)
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
      let msg = {
        from: this.sessionId,
        to: this.sessionId,
        text: this.message
      };
      console.log(msg)
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
