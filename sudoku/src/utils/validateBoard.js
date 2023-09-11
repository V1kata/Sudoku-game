export function validateBoard(board) {
  const rowSet = new Set();
  const columnSet = new Set();
  const boxSet = new Set();

  for (let x = 0; x < 9; x++) {
    const row = board[x];

    for (let y = 0; y < 9; y++) {
      const rowNumber = row[y];
      const columnNumber = board[y][x];
      const boxNumber =
        board[3 * Math.floor(x / 3) + Math.floor(y / 3)][
          ((x * 3) % 9) + (y % 3)
        ];

      if (rowNumber !== "-") {
        if (rowSet.has(rowNumber)) return false;

        rowSet.add(rowNumber);
      }

      if (columnNumber !== "-") {
        if (columnSet.has(columnNumber)) return false;

        columnSet.add(columnNumber);
      }

      if (boxNumber !== "-") {
        if (boxSet.has(boxNumber)) return false;

        boxSet.add(boxNumber);
      }
    }

    rowSet.clear();
    columnSet.clear();
    boxSet.clear();
  }

  return true;
}

export function isValid(x, y, num, board) {
  for (let i = 0; i < 9; i++) {
    if (
      board[x][i] === num ||
      board[i][y] === num ||
      board[3 * Math.floor(x / 3) + Math.floor(i / 3)][
        3 * Math.floor(y / 3) + (i % 3)
      ] === num
    ) {
      return false;
    }
  }
  return true;
}

export function areNotEqualBoards(board1, board2) {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (board1[x][y] !== board2[x][y]) {
        console.log(board1[x][y] + " - " + board2[x][y]);
        return true;
      }
    }
  }

  return false;
}
