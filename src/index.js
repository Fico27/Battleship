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

startButton.addEventListener("click", () => {
  playerBoard.innerHTML = "";
  computerBoard.innerHTML = "";
  gameContainer.classList.remove("hidden");
  randomButton.classList.remove("hidden");
  resetButton.classList.remove("hidden");
  startButton.classList.add("hidden");
  shipPanel.classList.remove("hidden");
  generateBoard(playerBoard, "player", gameDriver);
  generateBoard(computerBoard, "computer", gameDriver);
  enableShipDragging();
  gameDriver.startGame();
});

randomButton.addEventListener("click", () => {
  gameDriver.randomShipPlacementPlayer();
});

resetButton.addEventListener("click", () => {
  shipPanel.classList.remove("hidden");
  rotateButton.classList.remove("hidden");
  randomButton.classList.remove("hidden");
  theShip.forEach((ship) => {
    if (ship.classList.contains("hidden")) {
      ship.classList.toggle("hidden");
    }
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

      // shipPanel.classList.toggle("rotate-vert");
      // shipPanel.classList.toggle("rotate-hori");
      // ship.classList.remove("vertical");
      // ship.classList.add("horizontal");

      // shipPanel.classList.remove("rotate-hori");
      // shipPanel.classList.add("rotate-vert");
    } else {
      ship.dataset.direction = "vertical";
      // go vertical:
      ship.classList.toggle("vertical");
      ship.classList.toggle("horizontal");
      // shipPanel.classList.toggle("rotate-hori");
      // shipPanel.classList.toggle("rotate-vert");

      // ship.classList.remove("horizontal");
      // ship.classList.add("vertical");

      // shipPanel.classList.remove("rotate-vert");
      // shipPanel.classList.add("rotate-hori");
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
      console.log("Dragging ship:", shipData); // for testing
      e.dataTransfer.setData("text/plain", JSON.stringify(shipData));
    });
  });
}
