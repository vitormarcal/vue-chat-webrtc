<template>
  <b-container class="container">
    <div>
      <h1 class="title">
        Chat de Teleatendimento
      </h1>

      <p class="subtitle" v-if="this.podeConversarNoChat">
        Você está no atendimento agendado para a especialidade {{ this.tituloChat }}

      </p>

      <p class="subtitle" v-else>
        Você está vizualizando o histórico do atendimento para a especialidade {{ this.tituloChat }}
        <br>
        <template v-if="this.fimConsulta">
          O atendimento já foi finalizado: {{ this.dataConsulta }}
        </template>

      </p>

      <chat v-if="this.podeVisualizarChat"
            :to="destinatario"
            :id-consulta="this.id"
            :title="this.tituloChat"
            :ativo="podeConversarNoChat"
            :from="this.usuarioCorrente"
            :mensagens.sync="mensagens"
            :escrever="this.escrever"
            @update:escrever="(valor) => this.escrever = valor"
      >

      </chat>

      <div v-else>
        <b-spinner small label="Small Spinner"></b-spinner>
        <b-spinner small label="Small Spinner" type="grow"></b-spinner>
      </div>

      <div class="card w-100" id="mainFrame" v-show="escrever === 'N'">
        <video id="localVideo" ref="localVideo" autoplay muted>LocalVideo</video>
        <video id="remoteVideo" class="w-100 p-3" ref="remoteVideo" autoplay>RemoteVideo</video>
        <div class="bottom-bar d-flex justify-center">
          <v-btn class="mx-2" fab @click="offCamera()">
            <v-icon dark>
              mdi-camera
            </v-icon>
          </v-btn>
          <v-btn class="mx-2" fab>
            <v-icon dark>
              mdi-microphone
            </v-icon>
          </v-btn>
        </div>
      </div>

    </div>
  </b-container>
</template>

<script>
import Chat from "../../components/atendimento/Chat";
import ConsultaService from "@/services/consulta.service"
import io from 'socket.io-client'

const servers = {
  configuration: {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true
  },
  iceServers: [
    {urls: 'stun:stun.l.google.com:19302'},
    {urls: 'stun:stun1.l.google.com:19302'}
  ]
}

const RPC = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
const localPC = new RPC(servers)

export default {
  name: "index",
  middleware: ['autenticado', 'cadastro-incompleto'],
  components: {Chat},
  data() {
    return {
      consulta: null,
      podeVisualizarChat: false,
      mensagens: [],
      interval: null,
      room: this.$route.params.id,
      escrever: 'N',
    }
  },
  async asyncData({params}) {
    const id = params.slug;
    return {id}
  },
  methods: {
    offCamera() {
      this.$store.state.setting.camera.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled
      })
    },
    montarRegras() {
      const that = this;
      this.interval = setInterval(() => {
        if (!that.podeVisualizarChat) {
          if (that.dataConsulta && that.fimConsulta) {
            that.podeVisualizarChat = true;
          } else if (that.dataConsulta && !that.fimConsulta && new Date().getTime() >= that.dataConsulta.getTime()) {
            that.podeVisualizarChat = true;
          }
        }
        if (that.podeVisualizarChat) {
          clearInterval(that.interval)
        }
      }, 1000)
    }
  },
  computed: {
    podeConversarNoChat() {
      return this.podeVisualizarChat && !this.fimConsulta
    },
    usuarioCorrente() {
      return this.$store.state.auth.user;
    },
    tituloChat() {
      return this.consulta?.especialidade;
    },
    dataConsulta() {
      return this.consulta?.dataConsulta ? new Date(this.consulta.dataConsulta) : null
    },
    fimConsulta() {
      return this.consulta?.fimConsulta ? new Date(this.consulta.fimConsulta) : null;
    },
    destinatario() {
      if (this.usuarioCorrente.id === this.consulta?.idUsuarioTecnico) {
        return {
          id: this.consulta?.idUsuario,
          nome: this.consulta?.nomeUsuario || this.consulta?.usernameUsuario
        }
      } else if (this.usuarioCorrente.id === this.consulta?.idUsuario) {
        return {
          id: this.consulta?.idUsuarioTecnico,
          nome: this.consulta?.nomeTecnico || this.consulta?.usernameTecnico
        }
      } else {
        return {}
      }
    },
  },
  async beforeDestroy() {
    await this.$socket.emit('leave', this.room)
    clearInterval(this.interval);
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.interval)
    next();
  },
  async beforeMount() {
    const lastId = localStorage.getItem('lastId')
    if (lastId) {
      await this.$socket.emit('leave', this.room)
    }
    await this.$socket.emit('join', lastId)
    localStorage.setItem('lastId', this.room)
  },
  async mounted() {
    this.montarRegras();
    ConsultaService.buscarConsulta(this.id)
      .then(
        consulta => {
          if (consulta == null) {
            throw new Error("Consulta não encontrada")
          }
          if (!consulta.idUsuario) {
            this.$bvToast.toast("Essa consulta ainda não foi agendada", {
              title: 'Busca da consulta:',
              variant: 'danger',
              solid: true
            })

            setTimeout(() => {
              this.$router.push('/agenda/')
            }, 1000);
          }
          this.consulta = consulta;
          ConsultaService.buscarMensagens(this.id)
            .then(
              mensagens => {
                if (mensagens != null) {
                  this.mensagens = mensagens;
                }
              }
            )

        }
      )
      .catch(
        error => {
          let message = "Ocorreu um erro";
          if (error?.response?.data?.message) {
            message = error.response.data.message
          } else if (error?.message) {
            message = error.message;
          }
          this.$bvToast.toast(message, {
            title: 'Busca da consulta:',
            variant: 'danger',
            solid: true
          })

          setTimeout(() => {
            this.$router.push('/agenda/')
          }, 1000);
        }
      )

    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true})

    this.$refs.localVideo.srcObject = stream
    this.$store.commit('setting/setCamera', {
      camera: stream
    })

    stream.getTracks().forEach((track) => {
      localPC.addTrack(track, stream)
    })

    const offer = await localPC.createOffer()
    await localPC.setLocalDescription(offer)
    await this.$socket.emit('message', JSON.stringify({
      room: this.room,
      data: localPC.localDescription
    }))

    localPC.onicecandidate = async (event) => {
      if (event.candidate) {
        await this.$socket.emit('message', JSON.stringify({
          room: this.room,
          data: event.candidate
        }))
      } else {
        // eslint-disable-next-line
        console.log('allhasbeensent')
      }
    }

    localPC.ontrack = (event) => {
      if (event.streams[0]) {
        this.$refs.remoteVideo.srcObject = event.streams[0]
      }
    }

    this.$socket.on('message', async (data) => {
      if (typeof data == 'string') {
        data = JSON.parse(data);
      }
      if (data.type === 'offer') {
        await localPC.setRemoteDescription(new RTCSessionDescription(data))
        const answer = await localPC.createAnswer()
        await localPC.setLocalDescription(answer)
        await this.$socket.emit('message', JSON.stringify({
          room: this.room,
          data: localPC.localDescription
        }))
      } else if (data.type === 'answer') {
        await localPC.setRemoteDescription(new RTCSessionDescription(data))
      } else {
        await localPC.addIceCandidate(new RTCIceCandidate(data))
      }
    })
  }
}
</script>

<style scoped lang="scss">

.title {
  font-family: 'Quicksand',
  'Source Sans Pro',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  'Helvetica Neue',
  Arial,
  sans-serif;
  display: block;
  font-weight: 300;
  font-size: 32px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 1rem;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}


#localVideo {
  z-index: 100;
  position: absolute;
  right: 25px;
  height: 80px;
  width: 100px;
  bottom: 18px;
  background-color: #47494e;
}

#remoteVideo {
  height: calc(100vh - 64px);
  background-color: #7f828b;
}

.bottom-bar {
  position: absolute;
  bottom: 20px;
  width: 100vw;
  text-align: center;
}


@media (min-width: 448px) {
  #localVideo {
    height: 150px;
    width: 200px;
  }
}

</style>
