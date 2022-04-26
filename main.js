//Query selectors
var playerOneImg = document.querySelector("#playerOneImg");
var playerTwoImg = document.querySelector("#playerTwoImg");
var playerOneWins = document.querySelector("#playerOneWins");
var playerTwoWins = document.querySelector("#playerTwoWins");
var playerOneQuote = document.querySelector("#playerOneQuote");
var playerTwoQuote = document.querySelector("#playerTwoQuote");
var gameTitle = document.querySelector("#gameTitle");
var tttBox = document.querySelector("#tttBox");
var boardBoxes = Array.from(document.querySelectorAll('.board-box'));

//Global variables
var currentGame
var player1 = new Player("playerOne", "./assets/blanche.gif", "./assets/blanche.PNG", "Blanche");
var player2 = new Player("playerTwo", "./assets/dorothy.gif", "./assets/dorothy.PNG", "Dorothy");
var gameCount = 0;

//Eventlisteners
window.addEventListener('load', startNewGame)

tttBox.addEventListener('click', () => {
  var article = event.target.closest("article");
  if(currentGame.addPlayerToBoardBox(article.id)){
    updateBoxes();
    checkForWinner();
  }
});

// functions
function checkForWinner() {
  if(currentGame.findWinner()){
    updateWins();
    setGameTitle(`${currentGame.currentPlayer.name} Wins!`);
    displayQuotes();
    delayRestart();
  }else if(currentGame.determineDraw()){
    displayDrawGame()
    delayRestart();
  }else{
    alternatePlayer();
  }
}

function updateWins() {
  playerOneWins.innerText = `${player1.wins} wins`;
  playerTwoWins.innerText = `${player2.wins} wins`;
}

function setGameTitle(string){
  gameTitle.innerText = string
}

function alternatePlayer() {
  currentGame.togglePlayer(currentGame.currentPlayer.id == "playerOne");
  setGameTitle(`It's ${currentGame.currentPlayer.name}'s turn!`);
  setPlayerImage();
}

function updateBoxes() {
  for (var i = 0; i < boardBoxes.length; i++) {
    var playerId = currentGame.board[boardBoxes[i].id]
    if(playerId !== ""){
      var playerToken = currentGame[playerId].inactiveToken
      boardBoxes[i].innerHTML = `<img class="player-img" src="${playerToken}" alt="player token">`;
    }
  }
}

function displayDrawGame(){
  setGameTitle(`It's a Draw!`)
  loadRandomQuote(playerOneQuote, blancheLoses);
  loadRandomQuote(playerTwoQuote, dorothyLoses);
}

//Functions to start new game/reset board
function delayRestart(){
  setTimeout(() => {
    clearQuotes();
    clearBoard();
    startNewGame();
    setStarterPlayer();
  }, 5000)
}

function clearBoard() {
  for(var i = 0; i < boardBoxes.length; i++) {
    boardBoxes[i].innerHTML = "";
  }
}

function startNewGame() {
  currentGame = new Game(player1, player2);
  gameCount++;
}

function setStarterPlayer() {
  currentGame.togglePlayer(gameCount %2 == 0);
  setGameTitle(`It's ${currentGame.currentPlayer.name}'s turn!`)
  setPlayerImage();
}

//Toggle image for current player
function setPlayerImage() {
  if(player1 === currentGame.currentPlayer){
    playerOneImg.src = player1.activeToken;
    playerTwoImg.src = player2.inactiveToken;
  }else {
    playerOneImg.src = player1.inactiveToken;
    playerTwoImg.src = player2.activeToken;
  }
}

//functions to generate random quotes for the winner/loser
function clearQuotes() {
  playerOneQuote.innerText = "";
  playerTwoQuote.innerText = "";
}

function displayQuotes() {
  if(player1 === currentGame.currentPlayer){
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
