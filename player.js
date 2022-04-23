class Player{
  constructor(id, token, name) {
    this.id = id;
    this.token = token;
    this.name = name;
    this.wins = 0
  }
  increaseWins() {
    this.wins++
  }
}
