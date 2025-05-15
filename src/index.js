import "./style.css";
import GameDriver from "../src/js/gameDriver";
import { generateBoard } from "./js/domController";

const playerBoard = document.querySelector(".player-board");
const computerBoard = document.querySelector(".computer-board");

const gameDriver = new GameDriver();

const startButton = document.querySelector(".game-start-btn");
const rotateButton = document.querySelector(".rotate-btn");
const randomButton = document.querySelector(".game-start-rand");
const resetButton = document.querySelector(".game-start-reset");
const gameContainer = document.querySelector(".game-container");
const shipPanel = document.querySelector(".ship-panel");
const theShip = document.querySelectorAll(".ship");
const playGameBtn = document.querySelector(".play-game");
const status = document.querySelector(".game-status");

startButton.addEventListener("click", () => {
  playerBoard.innerHTML = "";
  computerBoard.innerHTML = "";
  gameContainer.classList.remove("hidden");
  randomButton.classList.remove("hidden");
  resetButton.classList.remove("hidden");
  startButton.classList.add("hidden");
  shipPanel.classList.remove("hidden");
  rotateButton.classList.toggle("hidden");
  playGameBtn.classList.toggle("hidden");
  status.innerHTML = "Place your ships! Then press play!";
  generateBoard(playerBoard, "player", gameDriver);
  generateBoard(computerBoard, "computer", gameDriver);
  enableShipDragging();
  gameDriver.startGame();
});

playGameBtn.addEventListener("click", () => {
  if (gameDriver.checkPlacement()) {
    playGameBtn.classList.toggle("hidden");
    shipPanel.classList.add("hidden");
    rotateButton.classList.add("hidden");
    randomButton.classList.add("hidden");
    computerBoard.classList.remove("disabled");
    status.innerHTML = "Attack! Sink your opponents shits!";
  }
});

randomButton.addEventListener("click", () => {
  gameDriver.randomShipPlacementPlayer();

  shipPanel.classList.toggle("hidden");
  randomButton.classList.toggle("hidden");
  rotateButton.classList.toggle("hidden");
});

resetButton.addEventListener("click", () => {
  shipPanel.classList.remove("hidden");
  rotateButton.classList.remove("hidden");
  randomButton.classList.remove("hidden");
  playGameBtn.classList.remove("hidden");
  status.innerHTML = "Place your ships! Then press play!";
  const allPlayerCells = document.querySelectorAll(".player-board .cell");
  allPlayerCells.forEach((cell) => cell.classList.remove("ship"));
  gameDriver.shipsPlaced = 0;

  theShip.forEach((ship) => {
    if (ship.classList.contains("hidden")) {
      ship.classList.toggle("hidden");
    }
    ship.draggable = true;
  });
  gameDriver.startGame();
});

rotateButton.addEventListener("click", () => {
  const ships = document.querySelectorAll(".ship");
  ships.forEach((ship) => {
    if (ship.classList.contains("vertical")) {
      //change class for design and data-direction value
      ship.dataset.direction = "horizontal";
      ship.classList.toggle("horizontal");
      ship.classList.toggle("vertical");
    } else {
      ship.dataset.direction = "vertical";
      // go vertical:
      ship.classList.toggle("vertical");
      ship.classList.toggle("horizontal");
    }
  });
  if (shipPanel.classList.contains("rotate-vert")) {
    shipPanel.classList.remove("rotate-vert");
    shipPanel.classList.add("rotate-hori");
  } else {
    shipPanel.classList.remove("rotate-hori");
    shipPanel.classList.add("rotate-vert");
  }
});

function enableShipDragging() {
  const ships = document.querySelectorAll(".ship");

  ships.forEach((ship) => {
    ship.addEventListener("dragstart", (e) => {
      const shipData = {
        id: ship.id,
        length: ship.dataset.length,
        direction: ship.dataset.direction,
      };

      e.dataTransfer.setData("text/plain", JSON.stringify(shipData));
    });
  });
}
