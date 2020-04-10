<template>
  <div class="home">
    <tic-tac-toe/>
  </div>
</template>

<script>
import TicTacToe from '../components/TicTacToe'

export default {
  name: 'Home',
  components: { TicTacToe }
}
</script>

<style>
.home {
  display: flex;
  justify-content: center;
}
</style>
