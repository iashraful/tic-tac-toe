<template>
  <div class="playground">
    <tic-tac-toe/>
  </div>
</template>

<script>
import TicTacToe from '../components/TicTacToe'

export default {
  name: 'Playground',
  components: { TicTacToe },
  data () {
    return {
      playerList: []
    }
  },
  mounted () {
    this.$io.on('NEW_PLAYER_ADDED', (playerName) => {
      this.playerList.push(playerName)
    })
  }
}
</script>

<style>
.playground {
  display: flex;
  justify-content: center;
}
</style>
