import "./style.css";
import GameDriver from "../src/js/gameDriver";
import { generateBoard } from "./js/domController";

const playerBoard = document.querySelector(".player-board");
const computerBoard = document.querySelector(".computer-board");

const gameDriver = new GameDriver();

const startButton = document.querySelector(".game-start-btn");

startButton.addEventListener("click", () => {
  playerBoard.innerHTML = "";
  computerBoard.innerHTML = "";
  generateBoard(playerBoard, "player", gameDriver);
  generateBoard(computerBoard, "computer", gameDriver);
  gameDriver.startGame();
});
