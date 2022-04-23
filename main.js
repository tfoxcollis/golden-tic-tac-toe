//query selectors
var playerOneImg = document.querySelector("#playerOneImg");
var playerTwoImg = document.querySelector("#playerTwoImg");
var playerOneWins = document.querySelector("#playerOneWins");
var playerTwoWins = document.querySelector("#playerTwoWins");
var playerOneQuote = document.querySelector("#playerOneQuote");
var playerTwoQuote = document.querySelector("#playerTwoQuote");
var gameTitle = document.querySelector("#gameTitle");
var tttBox = document.querySelector("#tttBox");

var currentGame
var player1 = new Player("one", "./assets/blanche.PNG")
var player2 = new Player("two", "./assets/dorothy.PNG")
var currentPlayer = player1
var gameCount = 0

// eventlisteners
window.addEventListener('load', () => {
  startNewGame();
})

tttBox.addEventListener('click', () => {
//did someone win? (check winning combinations)
    //yes -> delay for 10 seconds, prevent anymore gameplay, increase win #, display win/lose quote
        //clearBoard(), startNewGame(), setStarterPlayer()
    //no -> change to next player
})

// functions

function increaseWins() {
  playerOneWins.innerText = `${player1.wins} wins`
}

function startNewGame() {
  currentGame = new Game(player1, player2)
  gameCount++
}

function setStarterPlayer() {
  if(gameCount %2 == 0){
    currentPlayer = player2;
  }else{
    currentPlayer = player1;
  }
}

function clearBoard() {
  tttBox.innerHTML = `
    <article class="a1 board-box box"></article>
    <article class="b1 board-box box"></article>
    <article class="c1 board-box box"></article>
    <article class="a2 board-box box"></article>
    <article class="b2 board-box box"></article>
    <article class="c2 board-box box"></article>
    <article class="a3 board-box box"></article>
    <article class="b3 board-box box"></article>
    <article class="c3 board-box box"></article>
  `;
}

function clearQuotes() {
  playerOneQuote.innerText = "";
  playerTwoQuote.innerText = "";
}
