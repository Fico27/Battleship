const playerBoard = document.querySelector(".player-board");
const computerBoard = document.querySelector(".computer-board");

function generateBoard(boardOwner, player) {
  //generate rows(x) and columns(y)

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;
      cell.dataset.ownerOfBoard = player;

      // Add event listener if player is a computer

      if (player === "computer") {
        cell.addEventListener("click", (e) => {
          const xCoord = parseInt(e.target.dataset.x);
          const yCoord = parseInt(e.target.dataset.y);
          gameDriver.playerTurn([xCoord, yCoord]);
        });
      }
      boardOwner.appendChild(cell);
    }
  }
}
