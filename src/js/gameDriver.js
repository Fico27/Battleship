import Gameboard from "./gameboard";
import Ship from "./shipFactory";
import Player from "./player";
import { renderBoard } from "./domController";

class GameDriver {
  constructor() {
    this.player1 = new Player("Phil");
    this.player2 = new Player("Computer");
    this.currentPlayer = this.player1;
    this.computerMoves = new Set();
    this.isGameOver = false;
    this.shipsPlaced = 0;
    this.totalShips = 5;
    this.placementCompleted = false;
  }

  startGame() {
    //What do I need here????
    // I need to load ships to be placed.
    // I need to load player1 game board. I will load
    this.player1.gameboard = new Gameboard();
    this.player2.gameboard = new Gameboard();

    if (this.isGameOver === true) {
      this.isGameOver = false;
      this.player1.gameboard = new Gameboard();
      this.player2.gameboard = new Gameboard();
      this.currentPlayer = this.player1;
    }

    this.randomShipPlacement(this.player2);
    this.disableComputerBoard();
    renderBoard(
      document.querySelector(".computer-board"),
      this.player2.gameboard,
      "computer"
    );

    renderBoard(
      document.querySelector(".player-board"),
      this.player1.gameboard,
      "player"
    );
  }

  placeShipByDrag({ id, length, direction }, [x, y]) {
    const Ship = require("./shipFactory").default;
    const ship = new Ship(parseInt(length));

    const gameboard = this.player1.gameboard;

    // Check if the spot is valid
    if (
      !gameboard.inbounds(ship, [x, y], direction) ||
      !gameboard.checkCollision(ship, [x, y], direction)
    ) {
      alert("Invalid placement.");
      return;
    }

    gameboard.placeShip(ship, [x, y], direction);

    renderBoard(
      document.querySelector(".player-board"),
      this.player1.gameboard,
      "player"
    );

    // Hide ship from panel
    const draggedShip = document.getElementById(id);
    if (draggedShip) {
      draggedShip.classList.toggle("hidden");
    }
    this.shipsPlaced++;

    // if (this.shipsPlaced === this.totalShips) {
    //   const shipPanel = document.querySelector(".ship-panel");
    //   shipPanel.classList.toggle("hidden");
    //   this.placementCompleted = true;
    //   this.computerBoard.classList.remove("disabled");
    // }
  }

  randomShipPlacementPlayer() {
    this.player1.gameboard = new Gameboard();
    this.randomShipPlacement(this.player1);

    this.shipsPlaced = 5;
    this.placementCompleted = true;

    renderBoard(
      document.querySelector(".player-board"),
      this.player1.gameboard,
      "player"
    );
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
      while(!(player.gameboard.inbounds(ship, [ranNumX, ranNumY], direction) && player.gameboard.checkCollision(ship, [ranNumX, ranNumY], direction))){
        ranNumX = this.getRandomnumber();
        ranNumY= this.getRandomnumber();
        direction = this.getRandomDirection();
      }

      player.gameboard.placeShip(ship, [ranNumX, ranNumY], direction);
    });
  }

  takeTurn() {
    if (this.currentPlayer === this.player1) {
      // alert(`${this.player1.name}'s turn!`);
    } else {
      this.computerTurn();
    }
  }

  playerTurn([row, col]) {
    const randomButton = document.querySelector(".game-start-rand");
    const rotateButton = document.querySelector(".rotate-btn");
    const shipPanel = document.querySelector(".ship-panel");
    randomButton.classList.add("hidden");
    rotateButton.classList.add("hidden");

    if (this.isGameOver === true) {
      return;
    }
    if (this.currentPlayer !== this.player1) {
      return;
    }

    const wasHit = this.player2.gameboard.receiveAttack([row, col]);

    renderBoard(
      document.querySelector(".computer-board"),
      this.player2.gameboard,
      "computer"
    );

    if (this.player2.gameboard.gameOver()) {
      this.isGameOver = true;
      alert(`${this.player1.name} Wins!`);
      return;
    }
    // gives the player/computer an extra turn.
    if (wasHit) {
      return;
    }

    this.currentPlayer = this.player2;
    this.takeTurn();
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
    const wasHit = this.player1.gameboard.receiveAttack([ranNumX, ranNumY]);

    renderBoard(
      document.querySelector(".player-board"),
      this.player1.gameboard,
      "player"
    );

    if (this.player1.gameboard.gameOver()) {
      this.isGameOver = true;
      alert(`${this.player2.name} Wins!`);
    }

    // gives the player/computer an extra turn.
    if (wasHit) {
      setTimeout(() => this.computerTurn(), 400);
      return;
    }

    this.currentPlayer = this.player1;
    this.takeTurn();
  }

  disableComputerBoard() {
    const compBoard = document.querySelector(".computer-board");
    compBoard.classList.toggle("disabled");
  }

  checkPlacement() {
    if (this.shipsPlaced === this.totalShips) {
      const compBoard = document.querySelector(".computer-board");
      compBoard.classList.toggle("disabled");
      return true;
    } else {
      alert("Place all your ships!");
      return false;
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

export default GameDriver;
