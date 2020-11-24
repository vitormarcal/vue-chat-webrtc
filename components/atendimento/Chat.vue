<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3 v-if="chatAtivo">Você está conversando com @{{ to.nome }}</h3>
        <h3 v-else>Você estava conversando com @{{ to.nome }}</h3>
        <hr>
        <button v-if="chatAtivo" class="btn btn-danger" @click="finalizarChat">Finalizar chat</button>
      </div>
      <div class="card-body historico">
        <div class="messages" :class="{'message-out': msg.para === to.nome, 'message-in': msg.para !== to.nome}"
             v-for="(msg, index) in mensagens" :key="index">
          <span class="message-info">
            <span class="message-de" v-if="msg.para === to.nome">Você</span>
            <span class="message-de" v-else>{{ msg.de }}</span>
            <span class="message-time">{{ msg.time }}</span>
          </span>
          <span class="message-info message-text">{{ msg.texto }}</span>

        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <b-input-group label="Você: " label-for="input-mensagem">
          <b-form-input
            v-model="mensagem"
            :state="mensagemState"
            id="input-mensagem"
            :disabled="!chatAtivo"
            required
            placeholder="Digite uma mensangem">
          </b-form-input>
          <b-input-group-append>
            <button type="submit" :disabled="!chatAtivo || !this.mensagemState" class="btn btn-success">Enviar</button>
          </b-input-group-append>
        </b-input-group>
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
import {BIconXSquare, BIconTrash, BIconXCircleFill, BIconArrowUp} from 'bootstrap-vue'

export default {
  name: "Chat",
  props: ['to', 'title', 'iniciarEm', 'idConsulta', 'mensagens', 'ativo'],
  components: {
    BIconXSquare,
    BIconTrash,
    BIconXCircleFill,
    BIconArrowUp
  },
  data() {
    return {
      mensagem: '',
      exited: false,
      conectado: false,
    }
  },
  methods: {
    playSound () {
        const audio = new Audio('/elevator-song.mp3');
        audio.play();
    },
    scrollToEnd() {
      const container = this.$el.querySelector(".historico");
      container.scrollTop = container.scrollHeight;
      console.log(container.scrollHeight)
    },
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
                this.playSound();
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
  },
  updated() {
    this.scrollToEnd()
  }
}
</script>

<style scoped>

.historico {
  max-height: 50vh;
  overflow: auto;
  background-color: #f3f6fb;
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

.message-info {
  margin: 5px;
  display: block;
  color: #616e88;
}

.message-text {
  display: inline-block;
  background-color: black;
  color: rgb(234 234 239 / 80%);
  border-radius: 8px;
  padding: 15px 10px;

  border: 0 solid rgba(0, 0, 0, .125);
  box-shadow: 0 1rem 1.5rem -0.3rem rgba(76, 114, 179, .2);
}

.message-de {
  display: inline-block;
}

.message-time {
  font-size: 12px;
}

.message-in .message-text {
  background-color: white;
  color: #72757b;
}

</style>
