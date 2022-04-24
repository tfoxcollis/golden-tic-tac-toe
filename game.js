class Game{
  constructor(player1, player2) {
    this.playerOne = player1;
    this.playerTwo = player2;
    this.currentPlayer = player1;
    this.turnCounter = 1;
    this.active = true;
    this.board = {
                   a1: "", b1: "", c1: "",
                   a2: "", b2: "", c2: "",
                   a3: "", b3: "", c3: ""
                 }
  }

  togglePlayer(conditional) {
    if(conditional) {
      this.currentPlayer = this.playerTwo;
    }else{
      this.currentPlayer = this.playerOne;
    }
  }

  addPlayerToBoardBox(article) {
    this.board[article.id] = this.currentPlayer.id;
  }

  findWinner() {
    for(var i = 0; i < winningCombos.length; i++){
      var combo = winningCombos[i]
      if(this.board[combo[0]] === this.currentPlayer.id &&
         this.board[combo[1]] === this.currentPlayer.id &&
         this.board[combo[2]] === this.currentPlayer.id) {
        return true
      }
    }
  }
}
