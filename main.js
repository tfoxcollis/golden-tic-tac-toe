//Query selectors
var playerOneImg = document.querySelector("#playerOneImg");
var playerTwoImg = document.querySelector("#playerTwoImg");
var playerOneWins = document.querySelector("#playerOneWins");
var playerTwoWins = document.querySelector("#playerTwoWins");
var playerOneQuote = document.querySelector("#playerOneQuote");
var playerTwoQuote = document.querySelector("#playerTwoQuote");
var gameTitle = document.querySelector("#gameTitle");
var tttBox = document.querySelector("#tttBox");

//Global variables
var currentGame
var player1 = new Player("one", "./assets/blanche.gif", "./assets/blanche.PNG", "Blanche");
var player2 = new Player("two", "./assets/dorothy.gif", "./assets/dorothy.PNG", "Dorothy");
var currentPlayer = player1;
var gameCount = 0;

// eventlisteners
window.addEventListener('load', () => {
  startNewGame();
})

tttBox.addEventListener('click', () => {
  var article = event.target.closest("article");
  if(currentGame['board'][article.id] === "" && currentGame.active === true){
    addPlayerToken(article);
  }
  if(currentGame.findWinner(currentPlayer.id)){
    currentGame.active = false;
    increaseWins();
    setGameTitle(`${currentPlayer.name} Wins!`);
    displayQuotes();
    delayRestart();
  }else if(currentGame.turnCounter === 9){
    displayDrawGame()
    delayRestart();
  }else{
    alternatePlayer();
  }
});

// functions
function increaseWins() {
  currentPlayer.increaseWins();
  playerOneWins.innerText = `${player1.wins} wins`;
  playerTwoWins.innerText = `${player2.wins} wins`;
}

function startNewGame() {
  currentGame = new Game(player1, player2);
  gameCount++;
}

function delayRestart(){
  setTimeout(() => {
    clearQuotes();
    clearBoard();
    startNewGame();
    setStarterPlayer();
  }, 10000)
}

function setStarterPlayer() {
  togglePlayer(gameCount %2 == 0);
  setGameTitle(`It's ${currentPlayer.name}'s turn!`)
  setPlayerImage();
}

function setGameTitle(string){
  gameTitle.innerText = string
}
function alternatePlayer() {
  togglePlayer(currentPlayer.id == "one");
  setGameTitle(`It's ${currentPlayer.name}'s turn!`);
  setPlayerImage();
  currentGame.turnCounter++;
}

function togglePlayer(conditional) {
  if(conditional) {
    currentPlayer = player2;
  }else{
    currentPlayer = player1;
  }
}

function displayDrawGame(){
  setGameTitle(`It's a Draw!`)
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
  currentGame.board[article.id] = currentPlayer.id;
  article.innerHTML = `<img class="player-img" src="${currentPlayer.inactiveToken}" alt="player token">`;
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
  player.innerText = array[getRandomIndex(array)];
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
