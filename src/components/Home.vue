<template>
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <form action="#" class="home_form" @submit.prevent="join">
        <h1>Start Chatting.</h1>
        <div class="form-group">
          <label for="room_name" class="label">Room Name</label>
          <input type="text" name="room_name" required class="form-control" placeholder="e.g. abc" v-model.trim="room_name">
        </div>
        <div class="form-group">
          <label for="room" class="label">Room ID</label>
          <input type="text" required class="form-control" disabled name="room" placeholder="e.g. abc" v-model.trim="room">
        </div>
        <div class="form-group">
          <label for="name" class="label">Your Name</label>
          <input type="text" required class="form-control" name="name" v-model.trim="name">
        </div>
        <button type="submit" class="btn btn-default">Enter</button>
    </form>
    </div>
    <div class="col-md-4"></div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import uuid from 'uuid/v4'
import SimplyWebRTC from 'simplewebrtc'
export default {
  name: 'Home',
  data () {
    return {
      room_name: this.$route.query.roomName || '',
      room: this.$route.query.room || uuid(),
      name: ''
    }
  },
  computed: {
    ...mapGetters({
      roomName: 'getRoomName'
    })
  },
  methods: {
    ...mapMutations({
      setUserName: 'setUserName',
      setRoomName: 'setRoomName'
    }),
    join () {
      this.setUserName(this.name)
      this.setRoomName(this.room_name)
      window.webrtc = new SimplyWebRTC({
        localVideoEl: '',
        remoteVideosEl: '',
        autoRequestMedia: true,
        nick: this.name
      })
      if (this.room !== '' && this.name !== '' && this.room_name !== '') {
        this.$router.push({
          name: 'room',
          params: {
            room: this.room,
            room_name: this.room_name
          }
        })
      }
    }
  }
}
</script>
<style>
  .home_form {
    padding-left: 10px;
  }
  .label {
    text-align: left;
  }
</style>
