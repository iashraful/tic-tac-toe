<template>
  <div class="playground">
    <p>{{ mgs }}</p>
    <tic-tac-toe/>
  </div>
</template>

<script>
import TicTacToe from '../components/TicTacToe'
import UserMixin from '../mixins/user_mixin'

export default {
  name: 'Playground',
  mixins: [UserMixin],
  components: { TicTacToe },
  data () {
    return {
      player1: {},
      player2: {},
      mgs: 'Waiting for another player to join...'
    }
  },
  mounted () {
    if (!(this.me && this.me.id)) {
      this.$router.push('/')
    } else {
      this.$io.emit('PLAY_REQUEST', {
        from: this.me,
        to: this.getPlayerOne()
      })
    }
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
