class Player{
  constructor(id, gif, token, name) {
    this.id = id;
    this.activeToken = gif;
    this.inactiveToken = token;
    this.name = name;
    this.wins = 0
  }
  increaseWins() {
    this.wins++;
  }
}
