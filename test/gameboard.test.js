import Gameboard from "../src/js/gameboard";
import Ship from "../src/js/shipFactory";

test("Test to see if ship is inbounds", () => {
  const patrolBoat = new Ship(2);
  const board = new Gameboard();
  //testing vertical out of bounds
  expect(board.inbounds(patrolBoat, [-1, 0], "vertical")).toBe(false);
  expect(board.inbounds(patrolBoat, [10, 0], "vertical")).toBe(false);
  //testing horizontal out of bounds
  expect(board.inbounds(patrolBoat, [0, -1], "horizontal")).toBe(false);
  expect(board.inbounds(patrolBoat, [0, 10], "horizontal")).toBe(false);

  //testing in bounds

  expect(board.inbounds(patrolBoat, [0, 0], "horizontal")).toBe(true);
  expect(board.inbounds(patrolBoat, [5, 5], "horizontal")).toBe(true);
});

test("Test to place ship", () => {
  const patrolBoat = new Ship(2);
  const board = new Gameboard();

  board.placeShip(patrolBoat, [0, 0], "vertical");

  expect(board.board[0][0]).toEqual({ hit: false, theShip: patrolBoat });
});

test("Test to see if ships collide", () => {
  const patrolBoat = new Ship(2);
  const battleship = new Ship(4);
  const board = new Gameboard();

  board.placeShip(battleship, [0, 0], "vertical");

  expect(() => board.placeShip(patrolBoat, [0, 0], "horizontal")).toThrow(
    "Ship is overlapping with another ship"
  );
});
