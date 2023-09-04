import { isValid } from "./validateBoard";

export function solveSudoku(board) {
  if (solve(board)) {
    return board;
  } else {
    return "No solution exists.";
  }
}

function solve(board) {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (board[x][y] === '-') {
        for (let num = 1; num <= 9; num++) {
          if (isValid(x, y, num, board)) {
            board[x][y] = num;
            
            if (solve(board)) {
              return true;
            }

            board[x][y] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}
