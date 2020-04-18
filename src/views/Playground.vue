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
      player2: {}
    }
  },
  mounted () {

  },
  methods: {
  }
}
</script>

<style>
.playground {
  display: flex;
  justify-content: center;
}
</style>
