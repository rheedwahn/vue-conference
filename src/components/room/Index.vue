<template>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h2 style="text-align: center">Room: {{ room_name }}</h2>
        </div>
    </div>
    <p><br></p><hr>
    <div class="row">
        <div class="col-md-4">
            <div class="card" style="width: 100%">
              <div>
                <video width="100%" height="300px;" style="border: 2px; padding: 5px;" ref="me"></video>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ state.name }}</h5>
                <a href="#" class="btn btn-success" v-if="state.paused" @click.prevent="resumeMe">Resume Video</a>
                <a href="#" class="btn btn-default" v-else @click.prevent="pauseMe">Pause Video</a>
                <a href="#" class="btn btn-danger" v-if="state.muted" @click.prevent="unmuteMe">Unmute Me</a>
                <a href="#" class="btn btn-primary" v-else @click.prevent="muteMe">Mute Me</a>
              </div>
            </div>
            <p><br></p>
        </div>
        <person :client="client" v-for="client in clients" :key="client.peer.id"></person>
    </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Person from './partials/Person'
export default {
  props: {
    room: String,
    roomName: String
  },
  components: {
    Person
  },
  computed: {
    ...mapGetters({
      state: 'getState',
      room_name: 'getRoomName',
      clients: 'getClients'
    })
  },
  methods: {
    ...mapMutations({
      addPeer: 'addPeer',
      removePeer: 'removePeer',
      setMuted: 'setMuted',
      setPaused: 'pauseVideo'
    }),
    muteMe () {
      window.webrtc.mute()
      this.setMuted(true)
    },
    unmuteMe () {
      window.webrtc.unmute()
      this.setMuted(false)
    },
    pauseMe () {
      window.webrtc.pause()
      this.setPaused(true)
      this.setMuted(false)
    },
    resumeMe () {
      window.webrtc.resume()
      this.setPaused(false)
      this.setMuted(false)
    }
  },
  mounted () {
    window.webrtc.joinRoom(this.room)
    window.webrtc.on('videoAdded', (video, peer) => {
      this.addPeer({video, peer})
    })
    window.webrtc.on('videoRemoved', (video, peer) => {
      this.removePeer(peer)
    })
    window.webrtc.on('localStream', (stream) => {
      let attachMediaStream = require('attachmediastream')
      attachMediaStream(stream, this.$refs.me, {
        autoplay: true,
        mirror: true,
        mute: true
      })
    })
  }
}
</script>
