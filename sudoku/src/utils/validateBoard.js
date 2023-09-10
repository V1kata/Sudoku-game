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

export function areEqualBoards(board1, board2) {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; x < 9; y++) {

      if (board1[x][y] === board2[x][y]) {
        return false
      }
    }
  }

  return true
}