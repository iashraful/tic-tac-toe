<template>
  <div class="playground">
    <p style="padding-bottom: 1rem">{{ instructionOneMgs }}</p>
    <p><strong>Hi, {{ me.name }}. </strong>{{ mgs }}</p>
    <tic-tac-toe
      :active-sign="activeSign"
      :player-info="playerInfo"
      :login-user="me"
      @boardStatus="onBoardStatusUpdate"
    />
  </div>
</template>

<script>
import TicTacToe from './TicTacToe'
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
    this.$io.on('PLAY_REQ_REJECTED_BY_USER', (data) => {
      if (data.to.id === this.me.id) {
        this.$router.push('/')
      }
    })
    this.$io.on('PLAY_REQ_ACCEPTED_BY_USER', (data) => {
      if (data.to.id === this.me.id) {
        this.playerInfo = data.from
        this.mgs = 'You opponent\'s turn.'
        this.instructionOneMgs = 'You are "o"'
        this.activeSign = 'o'
      } else {
        this.playerInfo = data.to
      }
    })

    this.$io.on(`PLAY_AGAIN_REQ_${this.me.id}`, (data) => {
      this.$buefy.notification.open({
        message: `"${data.from.name}" wants to play again.`,
        type: 'is-success',
        size: 'is-small'
      })
    })

    if (this.me.id === this.$route.params.userId) {
      this.mgs = 'Your turn.'
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
    onBoardStatusUpdate (status) {
      this.mgs = status ? 'Your opponent\'s turn.' : 'Your turn.'
    }
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
