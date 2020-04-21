<template>
  <div class="tictactoe-board">
    <div v-for="(n, i) in 3" :key="i">
      <div
        v-for="(n, j) in 3" :key="j"
        :class="disableForMe ? 'mouse-disable' : 'mouse-enable'"
        @click="clickOnCell(i, j)">
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
  props: {
    activeSign: {
      type: String,
      default: 'x',
      required: true
    },
    loginUser: {
      type: Object,
      default: () => {},
      required: true
    },
    playerInfo: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data () {
    return {
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      disableForMe: false
    }
  },
  mounted() {
    this.$io.on(`PLAYED_BY_ANOTHER_${this.loginUser.id}`, (data) => {
      this.disableForMe = false
      this.updateMatrixData(data.matrix.xAxis, data.matrix.yAxis, data.matrix.sign)
    })
  },
  methods: {
    clickOnCell (x, y) {
      if (!this.disableForMe) {
        this.disableForMe = !this.disableForMe
        this.$io.emit('PLAYED_BY_A_PLAYER', {
          playerInfo: this.playerInfo,
          matrix: {
            xAxis: x,
            yAxis: y,
            sign: this.activeSign
          }
        })
        this.updateMatrixData(x, y)
      }
    },
    updateMatrixData (x, y, sign=this.activeSign) {
      this.board[x].splice(y, 1, sign)
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
  .mouse-disable {
    cursor: not-allowed;
  }
  .mouse-enable {
    cursor: pointer;
  }
</style>
