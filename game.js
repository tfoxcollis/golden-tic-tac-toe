class Game{
  constructor(player1, player2) {
    this.playerOne = player1;
    this.playerTwo = player2;
    this.currentPlayer = player1;
    this.turnCounter = 0;
    this.active = true;
    this.board = {
                   a1: "", b1: "", c1: "",
                   a2: "", b2: "", c2: "",
                   a3: "", b3: "", c3: ""
                 }
  }


  addPlayerToBoardBox(articleId) {
    if(this.board[articleId] === "" && this.active === true){
      this.board[articleId] = this.currentPlayer.id;
      this.turnCounter++;
      return true;
    }
  }

  findWinner() {
    for(var i = 0; i < winningCombos.length; i++){
      var combo = winningCombos[i]
      if(this.board[combo[0]] === this.currentPlayer.id &&
         this.board[combo[1]] === this.currentPlayer.id &&
         this.board[combo[2]] === this.currentPlayer.id) {
        this.active = false;
        this.currentPlayer.increaseWins();
        return true
      }
    }
  }

  determineDraw() {
    if(this.turnCounter === 9) {
      return true
    }
  }

  togglePlayer(conditional) {
    if(conditional) {
      this.currentPlayer = this.playerTwo;
    }else{
      this.currentPlayer = this.playerOne;
    }
  }
}
