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
  gameDriver.startGame();
});

randomButton.addEventListener("click", () => {
  gameDriver.startGame();
});

resetButton.addEventListener("click", () => {
  shipPanel.classList.remove("hidden");
  rotateButton.classList.remove("hidden");
  randomButton.classList.remove("hidden");
  gameDriver.startGame();
});

rotateButton.addEventListener("click", () => {
  const rotatedShips = document.querySelectorAll(".ship");

  rotatedShips.forEach((ship) => {
    if (ship.classList.contains("vertical")) {
      //change class for design and data-direction value
      ship.dataset.direction = "horizontal";
      ship.classList.remove("vertical");
      ship.classList.add("horizontal");

      shipPanel.classList.remove("rotate-hori");
      shipPanel.classList.add("rotate-vert");
    } else {
      ship.dataset.direction = "vertical";
      ship.classList.remove("horizontal");
      ship.classList.add("vertical");

      shipPanel.classList.remove("rotate-vert");
      shipPanel.classList.add("rotate-hori");
    }
  });
});
