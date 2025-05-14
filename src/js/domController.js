export function generateBoard(boardOwner, player, gameDriver) {
  //generate rows(x) and columns(y)

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;
      cell.dataset.ownerOfBoard = player;

      if (player === "player") {
        cell.addEventListener("dragover", (e) => {
          e.preventDefault();
        });

        cell.addEventListener("drop", (e) => {
          e.preventDefault();

          const shipData = JSON.parse(e.dataTransfer.getData("text/plain"));
          const dropX = parseInt(cell.dataset.x);
          const dropY = parseInt(cell.dataset.y);
          gameDriver.placeShipByDrag(shipData, [dropX, dropY]);
        });
      }

      // Add event listener if player is a computer

      if (player === "computer") {
        cell.addEventListener("click", (e) => {
          //stops the same cell from being clicked again.
          if (e.target.classList.contains("clicked")) return;

          const xCoord = parseInt(e.target.dataset.x);
          const yCoord = parseInt(e.target.dataset.y);
          gameDriver.playerTurn([xCoord, yCoord]);
        });
      }
      boardOwner.appendChild(cell);
    }
  }
}

export function renderBoard(domBoard, playerBoard, player) {
  const allCells = domBoard.querySelectorAll(".cell");

  allCells.forEach((cell) => {
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    const currentCell = playerBoard.board[x][y];

    cell.classList.remove("hit", "miss", "ship");

    if (currentCell === "miss") {
      cell.classList.add("miss", "clicked");
    } else if (currentCell?.hit === true) {
      cell.classList.add("hit", "clicked");
    } else if (player === "player" && currentCell?.theShip) {
      cell.classList.add("ship");
    }
  });
}
