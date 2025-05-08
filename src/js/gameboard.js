class Gameboard {
  constructor() {
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));
    this.ships = [];
  }

  // Will place a ship on the gameboard at specific coordinates.
  placeShip(ship, [startRow, startCol], direction) {
    let length = ship.shipLength();

    if (!this.inbounds(ship, [startRow, startCol], direction)) {
      throw new Error("Ship is out of bounds!");
    }
    if (!this.checkCollision(ship, [startRow, startCol], direction)) {
      throw new Error("Ship is overlapping with another ship");
    }

    if (direction === "vertical") {
      for (let i = 0; i < length; i++) {
        this.board[startRow + i][startCol] = { hit: false, theShip: ship };
      }
    } else if (direction === "horizontal") {
      for (let i = 0; i < length; i++) {
        this.board[startRow][startCol + i] = { hit: false, theShip: ship };
      }
    }
    this.ships.push(ship);
  }

  inbounds(ship, [startRow, startCol], direction) {
    let length = ship.shipLength();

    if (startRow < 0 || startCol < 0) {
      return false;
    }

    if (direction === "horizontal" && startCol + length - 1 > 9) return false;
    if (direction === "vertical" && startRow + length - 1 > 9) return false;

    return true;
  }

  checkCollision(ship, [startRow, startCol], direction) {
    let length = ship.shipLength();

    if (direction === "vertical") {
      for (let i = 0; i < length; i++) {
        if (this.board[startRow + i][startCol] !== null) {
          return false;
        }
      }
    }
    if (direction === "horizontal") {
      for (let i = 0; i < length; i++) {
        if (this.board[startRow][startCol + i] !== null) {
          return false;
        }
      }
    }
    return true;
  }

  // will send an attack and see if it is hit or miss.
  receiveAttack([row, col]) {
    let coord = this.board[row][col];

    if (coord === "miss") {
      return;
    }
    if (coord && coord.theShip) {
      if (coord.hit === false) {
        coord.hit = true;
        coord.theShip.hit();
      }
      return;
    }

    this.board[row][col] = "miss";
  }
  // will check to see if all if p1 or p2 ships are sunk.

  gameOver() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
