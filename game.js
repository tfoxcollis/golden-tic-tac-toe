class Game{
  constructor(player1, player2) {
    this.playerOne = player1;
    this.playerTwo = player2;
    this.board = {
                   a1: "", b1: "", c1: "",
                   a2: "", b2: "", c2: "",
                   a3: "", b3: "", c3: ""
                 }
  }

  findWinner(currentPlayerId) {
    for(var i = 0; i < winningCombos.length; i++){
      if(this.checkComboForId(winningCombos[i], currentPlayerId)){
        return true
      }
    }
  }
  checkComboForId(combo, currentPlayerId){
    var count = 0;
    for (var i = 0; i < combo.length; i++) {
      if(this.board[combo[i]] == currentPlayerId){
        count++
      }
    }
    if(count == 3){
      return true
    }
  }
}
