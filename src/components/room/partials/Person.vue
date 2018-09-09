<template>
    <div class="col-md-4">
        <div class="card" style="width: 100%">
            <div ref="people"></div>
            <div class="card-body">
                <h5 class="card-title">{{ client.peer.nick }}</h5>
                <!-- <a href="#" class="btn btn-primary">Pause</a> -->
            </div>
        </div>
        <p><br></p>
    </div>
</template>

<script>
export default {
  props: {
    client: Object
  },
  mounted () {
    this.$refs.people.appendChild(this.client.video)
  }
}
</script>
<style>
    video {
        width: 100%;
        height: 500px;
        border: 2px;
        padding: 5px;
    }
</style>
