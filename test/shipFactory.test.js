import Ship from "../src/js/shipFactory";

describe("Testing a new ship", () => {
  const ship = new Ship(3);

  test("test to see if ship gets hit", () => {
    ship.hit();
    expect(ship.hit()).toBe(2);
  });
});
