<template>
  <div id="app">
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
