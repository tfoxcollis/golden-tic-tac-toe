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
  var article = event.target.closest("article")
  if(currentGame['board'][article.id] === ""){
    addPlayerToken(article);
    alternatePlayer();
  }
//did someone win? (check winning combinations)
    //yes -> delay for 10 seconds, setTimeout(), prevent anymore gameplay, increase win #, display win/lose quote
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

function alternatePlayer() {
  if(currentPlayer.id == "one") {
    currentPlayer = player2;
  }else{
    currentPlayer = player1;
  }
}

function addPlayerToken(article) {
  currentGame.board[article.id] = currentPlayer.id
  article.innerHTML = `<img class="player-img" src="${currentPlayer.token}" alt="player token">`
}

function clearBoard() {
  tttBox.innerHTML = `
    <article id="a1" class="board-box box"></article>
    <article id="b1" class="board-box box"></article>
    <article id="c1" class="board-box box"></article>
    <article id="a2" class="board-box box"></article>
    <article id="b2" class="board-box box"></article>
    <article id="c2" class="board-box box"></article>
    <article id="a3" class="board-box box"></article>
    <article id="b3" class="board-box box"></article>
    <article id="c3" class="board-box box"></article>
  `;
}
//a1, b1, c1
//a1, a2, a3
//a2, b2, c2
//a3, b3, c3
//a1, b2, c3
//b1, b2, b3
//c1, b3, a3

function clearQuotes() {
  playerOneQuote.innerText = "";
  playerTwoQuote.innerText = "";
}

// function setTimeout(function () {
//
// }, 15000);

// function loadRandomQuote() {
//
// }

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
