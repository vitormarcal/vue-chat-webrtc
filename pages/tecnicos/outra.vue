<template>
  <div>
    <video id="localVideo" playsinline autoplay muted></video>
    <video id="remoteVideo" playsinline autoplay></video>
    <button @click="createOffer"> create offer</button>
  </div>

</template>

<script>
export default {
  name: "outra",
  middleware: ['autenticado', 'cadastro-incompleto'],
  data() {
    return {
      alice: null,
      bob: null
    }
  },
  methods: {
    inicia() {
      const conn = new WebSocket(this.url);
      this.conn = conn;
      conn.onopen = () => {
        console.log("Connected to the signaling server");
        this.initialize()
      };
      conn.onmessage = msg => {
        console.log("Got message", msg.data);
        var content = JSON.parse(msg.data);
        var data = content.data;
        switch (content.event) {
          // when somebody wants to call us
          case "offer":
            this.handleOffer(data);
            break;
          case "answer":
            this.handleAnswer(data);
            break;
          // when a remote peer sends an ice candidate to us
          case "candidate":
            this.handleCandidate(data);
            break;
          default:
            break;
        }
      };
    },
    createOffer() {
      const that = this;
      const offerOptions = {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      };

      this.alice.createOffer(offerOptions).then(offer => {
        that.send({
          event: "offer",
          data: offer
        });
        that.peerConnection.setLocalDescription(offer);
      })
    },
    send(data) {
      this.conn.send(JSON.stringify(data));
    },
    handleOffer(offer) {
      this.alice.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => this.alice.createAnswer())
        .then(answer => {
          this.alice.setLocalDescription(new RTCSessionDescription(answer));
          this.send({
            event: "answer",
            data: answer
          })
        })
    },
    handleAnswer(answer) {
      this.alice.setRemoteDescription(new RTCSessionDescription(answer));
      console.log("connection established successfully!!");
    },
    handleCandidate(candidate) {
      console.log('onIceCandidate: ', candidate);
      this.alice.addIceCandidate(new RTCIceCandidate(candidate));
    },
    initialize() {

      const alice = new RTCPeerConnection();
      const bob = new RTCPeerConnection();
      this.bob = bob;
      this.alice = alice;

      alice.onicecandidate = e => {
        if (e.candidate) {
          bob.addIceCandidate(e.candidate);
        }
      }

      const remoteStream = new MediaStream()

      alice.addEventListener('track', async (event) => {
        console.log("Add trach")
        remoteStream.addTrack(event.track, remoteStream);
      });

      bob.onicecandidate = e => {
        if (e.candidate) {
          alice.addIceCandidate(e.candidate);
        }
      }

      navigator.mediaDevices.getUserMedia({
        video: true,
      }).then(stream => {
        document.getElementById('localVideo').srcObject = stream;
        alice.addStream(stream);
        return alice.createOffer()
      }).then(offer => alice.setLocalDescription(new RTCSessionDescription(offer)))
        .then(() => bob.setRemoteDescription(alice.localDescription))
        .then(() => bob.createAnswer())
        .then(answer => bob.setLocalDescription(new RTCSessionDescription(answer)))
        .then(() => alice.setRemoteDescription(bob.localDescription))


      bob.ontrack = e => {
        document.getElementById("remoteVideo").srcObject = e.streams[0];
      }
    }
  },
  computed: {
    usuarioCorrente() {
      return this.$store.state.auth.user;
    },
    url() {
      let url = process.env.backendApi
      url = url.replace("http", 'ws')
      return `${url}/secured/video?access_token=${this.usuarioCorrente?.accessToken}`
    }
  },
  mounted() {
    this.inicia();
  },
}
</script>

<style scoped>

</style>
