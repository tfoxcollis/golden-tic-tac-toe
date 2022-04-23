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
var player1 = new Player("one", "./assets/blanche.PNG", "Blanche")
var player2 = new Player("two", "./assets/dorothy.PNG", "Dorothy")
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
    if(currentGame.findWinner(currentPlayer.id)){
      increaseWins();
      displayWinner();
      // displayQuote()
      setTimeout(() => {
        clearBoard()
        startNewGame()
        setStarterPlayer()
      }, 2000)
    }else{
      alternatePlayer();
    }
  }
//did someone win? (check winning combinations)
    //yes -> delay for 10 seconds, setTimeout(), prevent anymore gameplay, increase win #, display win/lose quote
        //clearBoard(), startNewGame(), setStarterPlayer()
    //no -> change to next player
})

// functions

function increaseWins() {
  currentPlayer.increaseWins()
  playerOneWins.innerText = `${player1.wins} wins`
  playerTwoWins.innerText = `${player2.wins} wins`
}

function displayWinner(){
  gameTitle.innerText = `${currentPlayer.name} Wins!`
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
  gameTitle.innerText = `It's ${currentPlayer.name}'s turn!`
}

function alternatePlayer() {
  if(currentPlayer.id == "one") {
    currentPlayer = player2;
  }else{
    currentPlayer = player1;
  }
  gameTitle.innerText = `It's ${currentPlayer.name}'s turn!`
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

function clearQuotes() {
  playerOneQuote.innerText = "";
  playerTwoQuote.innerText = "";
}

// function loadRandomQuote() {
//if currentPlayerwins - find currentPlayer winning array and generate random quote
// }

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
