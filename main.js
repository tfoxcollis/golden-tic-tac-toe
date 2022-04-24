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
var player1 = new Player("one", "./assets/blanche.gif", "./assets/blanche.PNG", "Blanche")
var player2 = new Player("two", "./assets/dorothy.gif", "./assets/dorothy.PNG", "Dorothy")
var currentPlayer = player1
var gameCount = 0

// eventlisteners
window.addEventListener('load', () => {
  startNewGame();
})

tttBox.addEventListener('click', () => {
  var article = event.target.closest("article")
  if(currentGame['board'][article.id] === "" && currentGame.active === true){
    addPlayerToken(article);
    if(currentGame.findWinner(currentPlayer.id)){
      currentGame.active = false;
      increaseWins();
      displayWinner();
      displayQuotes();
      setTimeout(() => {
        clearQuotes();
        clearBoard();
        startNewGame();
        setStarterPlayer();
      }, 5000)
    }else if(currentGame.turnCounter === 9){
      displayDrawGame()
      setTimeout(() => {
        clearBoard();
        clearQuotes();
        startNewGame();
        setStarterPlayer();
      }, 5000)
    }else{
      alternatePlayer();
    }
  }
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
  setPlayerImage();
}

function alternatePlayer() {
  if(currentPlayer.id == "one") {
    currentPlayer = player2;
  }else{
    currentPlayer = player1;
  }
  gameTitle.innerText = `It's ${currentPlayer.name}'s turn!`
  setPlayerImage();
  currentGame.turnCounter++
}

function displayDrawGame(){
  gameTitle.innerText = `It's a Draw!`
  loadRandomQuote(playerOneQuote, blancheLoses);
  loadRandomQuote(playerTwoQuote, dorothyLoses);
}

function setPlayerImage() {
  if(player1 === currentPlayer){
    playerOneImg.src = player1.activeToken;
    playerTwoImg.src = player2.inactiveToken;
  }else {
    playerOneImg.src = player1.inactiveToken;
    playerTwoImg.src = player2.activeToken;
  }
}

function addPlayerToken(article) {
  currentGame.board[article.id] = currentPlayer.id
  article.innerHTML = `<img class="player-img" src="${currentPlayer.inactiveToken}" alt="player token">`
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

function displayQuotes() {
  if(player1 === currentPlayer){
    loadRandomQuote(playerOneQuote, blancheWins);
    loadRandomQuote(playerTwoQuote, dorothyLoses);
  }else {
    loadRandomQuote(playerTwoQuote, dorothyWins);
    loadRandomQuote(playerOneQuote, blancheLoses);
  }
}

function loadRandomQuote(player, array) {
  player.innerText = array[getRandomIndex(array)]
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
