<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3 v-if="chatAtivo">Você está conversando com @{{ to.nome }}</h3>
        <h3 v-else>Você estava conversando com @{{ to.nome }}</h3>
        <hr>
      </div>
      <div class="card-body historico">
        <div class="messages" :class="{'message-out': msg.para === to.nome, 'message-in': msg.para !== to.nome}"
             v-for="(msg, index) in mensagens" :key="index">
          <div class="font-weight-bold">{{ msg.de }}</div>
          <p>{{ msg.texto }}</p>
          <div class="font-weight-bold">{{ msg.time }}</div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <b-form-group label="Você: " label-for="input-mensagem">
          <b-form-input
            v-model="mensagem"
            :state="mensagemState"
            id="input-mensagem"
            :disabled="!chatAtivo"
            required
            placeholder="Digite uma mensangem">

          </b-form-input>
        </b-form-group>
        <button type="submit" :disabled="!chatAtivo || !this.mensagemState" class="btn btn-success">Enviar</button>
        <button v-if="chatAtivo" class="btn btn-danger" @click="finalizarChat">Finalizar chat</button>
      </form>
    </div>

    <b-modal id="modal-finalizar-chat" title="Cadastro de usuário" @ok="finalizarComMensagem">
      <p class="title">
        Tem certeza que deseja finalizar o chat? Não poderá ser revertido e a consulta será finalizada!
      </p>
    </b-modal>
  </div>
</template>
<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: "Chat",
  props: ['to', 'title', 'iniciarEm', 'idConsulta', 'mensagens', 'ativo'],
  data() {
    return {
      mensagem: '',
      exited: false,
      conectado: false,
    }
  },
  methods: {
    connect() {
      if (this.url) {
        this.stompClient.connect(
          {},
          frame => {
            this.conectado = true;
            this.stompClient.subscribe(
              `/secured/room/queue-user${this.sessionId}`,
              evento => {
                this.mensagens.push(JSON.parse(evento.body))
              });
          },
          error => {
            console.log(error);
            this.conectado = false;
          }
        );
      }
    },
    finalizarChat() {
      this.$bvModal.show('modal-finalizar-chat')
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.conectado = false;
    },
    tickleConnection() {
      if (!this.conectado) {
        setTimeout(() => {
          console.log("Vou tentar conectar ao websocket em 2s!")
          this.conectado = true;
          this.connect();
        }, 2000);

      }
    },
    sendMessage(e) {
      if (e) {
        e.preventDefault();
      }
      const agora = new Date();
      const time = `${agora.getHours()}:${agora.getMinutes()}`

      let msg = {
        de: this.usuarioCorrente.username,
        para: this.to.nome,
        texto: this.mensagem,
        idConsulta: this.idConsulta,
        time: time,
        exited: this.exited
      };
      this.mensagens.push(msg)
      this.stompClient.send('/secured/room', JSON.stringify(msg), {});
      this.mensagem = '';
    },
    finalizarComMensagem() {
      this.mensagem = 'Saí da sala';
      this.exited = true
      this.sendMessage();
      this.disconnect();
    }
  },
  computed: {
    mensagemState() {
      if (this.mensagem !== null && this.mensagem.trim() === '') {
        return null;
      } else {
        return this.mensagem.length < 512
      }
    },
    chatAtivo() {
      if (this.ativo && this.conectado) {
        const mensagemDeSaida = this.mensagens.find(m => m.exited)
        return !mensagemDeSaida;
      } else {
        return false
      }
    },
    usuarioCorrente() {
      return this.$store.state.auth.user;
    },
    url() {
      if (this.usuarioCorrente?.accessToken) {
        return `${process.env.backendApi}/secured/room?access_token=${this.usuarioCorrente.accessToken}`;
      }
      return null;
    },
    socket() {
      return new SockJS(this.url);
    },
    stompClient() {
      if (this.socket) {
        return Stomp.over(this.socket);
      }
    },
    sessionId() {
      let sessionId = this.stompClient.ws._transport.url;
      sessionId = sessionId.substr(sessionId.indexOf('/secured/room') + 13);
      sessionId = sessionId.replace(`/websocket?access_token=${this.usuarioCorrente.accessToken}`, '');
      sessionId = sessionId.replace(/\/[0-9]+\//, "");
      console.log("Your current session is: " + sessionId);
      return sessionId;
    }
  },
  mounted() {
    this.tickleConnection()
  },
  watch: {
    conectado() {
      this.tickleConnection()
    },
  }
}
</script>

<style scoped>

.historico {
  max-height: 50vh;
  overflow: auto;
}

.messages {
  margin: 15px 5px;
}

.message-out {
  text-align: right;
}

.message-in {
  text-align: left;
}

</style>
