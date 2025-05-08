import Gameboard from "../src/js/gameboard";
import Ship from "../src/js/shipFactory";
import Player from "../src/js/player";

class GameDriver {
  constructor() {
    this.player1 = new Player("Phil");
    this.player2 = new Player("Computer");
    this.currentPlayer = this.player1;
    this.computerMoves = new Set();
    this.isGameOver = false;
  }

  startGame() {
    //What do I need here????
    // I need to load ships to be placed.
    // I need to load player1 game board. I will load

    if (this.isGameOver === true) {
      this.isGameOver = false;
      this.player1.board = new Gameboard();
      this.player2.board = new Gameboard();
      this.currentPlayer = this.player1;
    }

    randomShipPlacement(this.player2);
  }

  randomShipPlacement(player) {
    const carrier = new Ship(5);
    const battleship = new Ship(4);
    const destroyer = new Ship(3);
    const submarine = new Ship(3);
    const patrolBoat = new Ship(2);

    const shipArray = [carrier, battleship, destroyer, submarine, patrolBoat];

    shipArray.forEach((ship) => {
      let ranNumX = this.getRandomnumber();
      let ranNumY = this.getRandomnumber();
      let direction = this.getRandomDirection();

      // prettier-ignore
      while(!(player.board.inbounds(ship, [ranNumX, ranNumY], direction) && player.board.checkCollision(ship, [ranNumX, ranNumY], direction))){
        ranNumX = this.getRandomnumber();
        ranNumY= this.getRandomnumber();
        direction = this.getRandomDirection();
      }

      player.board.placeShip(ship, [ranNumX, ranNumY], direction);
    });
  }

  takeTurn() {
    if (this.currentPlayer === this.player1) {
      alert(`${this.player1.name}'s turn!`);
    } else {
      this.computerTurn();
    }
  }

  playerTurn([row, col]) {
    if (this.isGameOver === true) {
      return;
    }
    if (this.currentPlayer !== this.player1) {
      return;
    }
    this.player2.board.receiveAttack([row, col]);

    if (this.player2.board.gameOver()) {
      this.isGameOver = true;
      alert(`${this.player1.name} Wins!`);
    } else {
      this.currentPlayer = this.player2;
      this.takeTurn();
    }
  }

  computerTurn() {
    if (this.isGameOver === true) {
      return;
    }
    let ranNumX = this.getRandomnumber();
    let ranNumY = this.getRandomnumber();

    while (this.computerMoves.has(`${ranNumX},${ranNumY}`)) {
      ranNumX = this.getRandomnumber();
      ranNumY = this.getRandomnumber();
    }
    this.computerMoves.add(`${ranNumX},${ranNumY}`);
    this.player1.board.receiveAttack([ranNumX, ranNumY]);

    if (this.player1.board.gameOver()) {
      this.isGameOver = true;
      alert(`${this.player2.name} Wins!`);
    } else {
      this.currentPlayer = this.player1;
      this.takeTurn();
    }
  }

  getRandomnumber() {
    return Math.floor(Math.random() * 10);
  }
  getRandomDirection() {
    if (Math.random() < 0.5) {
      return "horizontal";
    } else {
      return "vertical";
    }
  }
}
