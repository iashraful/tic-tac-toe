<template>
  <div class="tictactoe-board">
    <div v-for="(n, i) in 3" :key="i">
      <div v-for="(n, j) in 3" :key="j" @click="clickOnCell(n, j)">
        <cell :value="board[i][j]"></cell>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from './Cell'

export default {
  name: 'TicTacToe',
  components: { Cell },
  data () {
    return {
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ]
    }
  },
  methods: {
    clickOnCell (x, y) {
      console.log(x, y)
      this.board[x].splice(y, 1, 'o')
    }
  }
}
</script>

<style>
  .tictactoe-board {
    display: flex;
    flex-wrap: wrap;
    width: 204px;
    height: 204px;
}
</style>
