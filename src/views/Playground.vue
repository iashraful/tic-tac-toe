<template>
  <div class="playground">
    <p><strong>Hi, {{ me.name }}. </strong>{{ mgs }}</p>
    <p>{{ instructionOneMgs }}</p>
    <tic-tac-toe
      :active-sign="activeSign"
      :player-info="playerInfo"
      :login-user="me"
    />
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
      activeSign: 'x',
      playerInfo: {},
      mgs: 'Waiting for another player to join...',
      instructionOneMgs: ''
    }
  },
  mounted () {
    this.$io.on('PLAY_REQ_ACCEPTED_BY_USER', (data) => {
      if (data.to.id === this.me.id) {
        this.playerInfo = data.from
        this.mgs = 'Game is started.'
        this.instructionOneMgs = 'You are "o"'
        this.activeSign = 'o'
      } else {
        this.playerInfo = data.to
      }
    })

    if (this.me.id === this.$route.params.userId) {
      this.mgs = 'Game has started.'
      this.instructionOneMgs = 'You are "x"'
      this.activeSign = 'x'
    }

    if (!(this.me && this.me.id)) {
      this.$router.push('/')
    } else {
      this.$io.emit('PLAY_REQUEST', {
        from: this.me,
        to: {id: this.$route.params.userId}
      })
    }
  },
  methods: {

  }
}
</script>

<style>
.playground {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
