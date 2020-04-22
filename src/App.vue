<template>
  <div class="container">
    <div class="title main-title">Tic Tac Toe</div>
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
 .container {
   margin: 3rem;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;

   .main-title {
     font-weight: 700;
     color: #7a14de;
   }
 }
</style>
