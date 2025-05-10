import "./style.css";
import GameDriver from "../src/js/gameDriver";
import { generateBoard } from "./js/domController";

const playerBoard = document.querySelector(".player-board");
const computerBoard = document.querySelector(".computer-board");

const gameDriver = new GameDriver();

const startButton = document.querySelector(".game-start-btn");
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
  randomButton.classList.remove("hidden");
  gameDriver.startGame();
});
