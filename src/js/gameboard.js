class Gameboard {
  constructor() {
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));
  }

  // Will place a ship on the gameboard at specific coordinates.
  placeShip() {}

  // will send an attack and see if it is hit or miss.
  receiveAttack() {}
  // will check to see if all if p1 or p2 ships are sunk.

  gameOver() {}
}

const carrier = new Ship(5);
const battleship = new Ship(4);
const destroyer = new Ship(3);
const submarine = new Ship(3);
const patrolBoat = new Ship(2);
