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
      player1: {},
      player2: {},
      mgs: 'Waiting for another player to join...'
    }
  },
  mounted () {
    this.getPlayerOne()
  },
  methods: {
    getPlayerOne () {
      /**
       * Player 1 is a person who copied the the link and shared with others
       */
      const playerOneId = this.$route.params.userId
      this.player1 = this.$store.getters.getPlayerById(playerOneId)
      console.log(this.player1)
    }
  }
}
</script>

<style>
.playground {
  display: flex;
  justify-content: center;
}
</style>
