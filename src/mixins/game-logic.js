export default {
  name: 'GameLogic',
  methods: {
    hasAvailableMoves() {
      let hasMove = false
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] === '') {
            hasMove = true
          }
        }
      }
      return hasMove
    },
    getPossibleMoves() {
      let moves = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.cells[i][j] === '') {
            moves.push({x: i, y: j});
          }
        }
      }
      return moves
    },
    isGameOver() {
      return !this.hasAvailableMoves() || this.checkGameStatus('x') || this.checkGameStatus('o')
    },
    checkGameStatus(playerSymbol) {
      // Horizontal rows
      for (let i = 0; i < 3; i++) {
        if (this.board[0][i] === playerSymbol && this.board[1][i] === playerSymbol && this.board[2][i] === playerSymbol) {
          return true
        }
      }

      // Vertical rows
      for (let i = 0; i < 3; i++) {
        if (this.board[i][0] === playerSymbol && this.board[i][1] === playerSymbol && this.board[i][2] === playerSymbol) {
          return true
        }
      }

      // Diagonals
      if (this.board[0][0] === playerSymbol && this.board[1][1] === playerSymbol && this.board[2][2] === playerSymbol) {
        return true
      }
      if (this.board[2][0] === playerSymbol && this.board[1][1] === playerSymbol && this.board[0][2] === playerSymbol) {
        return true
      }

      return false
    }
  }
}
