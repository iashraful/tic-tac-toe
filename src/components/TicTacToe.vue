<template>
  <div class="container">
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

    <div class="game-utility">
      <p class="title has-text-centered" v-if="gameOverText">{{ gameOverText }}</p>
      <b-button v-if="gameOverText" type="is-warning" @click="playAgain">Play Again</b-button>
    </div>
  </div>
</template>

<script>
  import Cell from './Cell'
  import GameLogic from '../mixins/game-logic'

  export default {
    name: 'TicTacToe',
    components: {Cell},
    mixins: [GameLogic],
    props: {
      activeSign: {
        type: String,
        default: 'x',
        required: true
      },
      loginUser: {
        type: Object,
        default: () => {
        },
        required: true
      },
      playerInfo: {
        type: Object,
        default: () => {
        },
        required: true
      }
    },
    data() {
      return {
        board: [
          ['', '', ''],
          ['', '', ''],
          ['', '', '']
        ],
        disableForMe: false,
        gameOverText: ''
      }
    },
    mounted() {
      this.$io.on(`PLAYED_BY_ANOTHER_${this.loginUser.id}`, (data) => {
        this.disableForMe = false
        this.$emit('boardStatus', this.disableForMe)
        this.updateMatrixData(data.matrix.xAxis, data.matrix.yAxis, data.matrix.sign)
        if (this.isGameOver()) {
          this.gameOverText = this.checkGameStatus(data.matrix.sign) ? 'You lose!' : 'Draw'
        }
      })
      this.$io.on('PLAY_REQ_ACCEPTED_BY_USER', (data) => {
        if (data.to.id === this.loginUser.id) {
          this.disableForMe = true
        }
      })
    },
    methods: {
      clickOnCell(x, y) {
        if (!this.disableForMe) {
          this.disableForMe = !this.disableForMe
          this.$emit('boardStatus', this.disableForMe)
          this.$io.emit('PLAYED_BY_A_PLAYER', {
            playerInfo: this.playerInfo,
            matrix: {
              xAxis: x,
              yAxis: y,
              sign: this.activeSign
            }
          })
          this.updateMatrixData(x, y)
          if (this.isGameOver()) {
            this.gameOverText = this.checkGameStatus(this.activeSign) ? 'You win!' : 'Draw'
          }
        }
      },
      updateMatrixData(x, y, sign = this.activeSign) {
        this.board[x].splice(y, 1, sign)
      }
    }
  }
</script>

<style lang="scss">
  .tictactoe-board {
    display: flex;
    flex-wrap: wrap;
    width: 204px;
    height: 204px;

    .mouse-disable {
      cursor: not-allowed;
    }

    .mouse-enable {
      cursor: pointer;
    }
  }

  .game-utility {
    p {
      color: #7a14de;
      font-weight: 700;
    }
  }
</style>
