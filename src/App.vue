<template>
  <div class="container">
    <p v-show="alertMgs !== ''">{{ alertMgs }}</p>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      alertMgs: ''
    }
  },
  created () {
    this.$io.on('ALL_PLAYERS', (players) => {
      if (players.length === 0) {
        this.$store.commit('removeLoginUser')
      }
      this.$store.commit('setPlayerList', players)
    })
  }
}
</script>

<style>
  /** {*/
  /*  background-color: darkslategray;*/
  /*}*/
</style>
