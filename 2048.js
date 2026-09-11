let board;
let score = 0;
let rows = 4;
let columns = 4;

window.onload = () => setGame();

function setGame() {
  // board = [
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0],
  // ];

  board = [
    [2, 2, 2, 2],
    [2, 2, 2, 2],
    [4, 4, 8, 8],
    [4, 4, 8, 8],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");

  if (num > 0) {
    tile.innerText = num;
    if (num <= 4096) {
      tile.classList.add(`x${num.toString()}`);
    } else {
      tile.classList.add(`x8192`);
    }
  }
}

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft" || e.code == "KeyA") {
    slideLeft();
  } else if (e.code == "ArrowRight" || e.code == "KeyD") {
    slideRight();
  } else if (e.code == "ArrowUp" || e.code == "KeyW") {
    slideUp();
  } else if (e.code == "ArrowDown" || e.code == "KeyS") {
    slideDown();
  }
});

function filterZero(row) {
  return row.filter((num) => num != 0);
}

function slide(row) {
  // [0, 2, 2, 2]
  row = filterZero(row); // -> [2, 2, 2]

  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    } // [2, 2, 2] -> [4, 0, 2]
  }

  row = filterZero(row);

  while (row.length < columns) {
    row.push(0);
  }

  return row; // -> [4, 2, 0, 0]
}

function slideLeft() {
  for (let r = 0; r < 4; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < 4; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];

      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];

      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];

      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}