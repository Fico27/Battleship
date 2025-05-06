import Ship from "../src/js/shipFactory";

describe("Testing a new ship", () => {
  const ship = new Ship(3);

  test("test to see if ship gets hit", () => {
    ship.hit();
    expect(ship.hit()).toBe(2);
  });
});

describe("Has the ship been sunk?", () => {
  const ship = new Ship(3);

  test("Has it sunk? after a single hit", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test("Has it sunk after three hits", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
