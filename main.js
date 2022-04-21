//query selectors
var playerOneImg = document.querySelector("#playerOneImg");
var playerTwoImg = document.querySelector("#playerTwoImg");
var playerOneWins = document.querySelector("#playerOneWins");
var playerTwoWins = document.querySelector("#playerTwoWins");
var playerOneQuote = document.querySelector("#playerOneQuote");
var playerTwoQuote = document.querySelector("#playerTwoQuote");
var gameTitle = document.querySelector("#gameTitle");
var tttBox = document.querySelector("#tttBox");

var blancheWins = [];
var blancheLoses = [];
var dorothyhWins = [];
var dorothyLoses = [];

var currentGame
var player1 = new Player("one", "./assets/blanche.PNG")
var player2 = new Player("two", "./assets/dorothy.PNG")

// eventlisteners
window.addEventListener('load', )

currentGame = new Game(player1, player2)



// functions
