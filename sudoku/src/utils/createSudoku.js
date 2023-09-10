import { EMPTY_BOARD } from "../config/boards";
import { makeDeepCopy } from "./makeDeepCopy";
import { solveSudoku } from "./solveSudoku";
import { areEqualBoards } from "./validateBoard";

export function createSudoku(allBoards) {
    const boardForModifieing = makeDeepCopy(EMPTY_BOARD);
    const newBoard = solveSudoku(modifieBoard(boardForModifieing));

    for (let i = 0; i < allBoards.length; i++) {
        const board = allBoards[i];

        if (!areEqualBoards(board, newBoard)) {
            solveSudoku(modifieBoard(newBoard));
            i = -1;
        }
    }

    return newBoard;
}

function modifieBoard(board) {
  let num = randomNumber(); // Random number
  let xOrY = randomNumber(2, 0); // Randomly choose to modify row (1) or column (2)

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if ((xOrY === 1 && x === num) || (xOrY === 2 && y === num)) {
        board[x][y] = randomNumber(2, 0) === 1 ? x : y;
      }
    }
  }

  return board;
}

function makeWhiteSpaces(board) {
  const numToRemove = randomNumber();

  for (let i = 0; i < numToRemove; i++) {
    const x = Math.floor(Math.random() * 9);
    const y = Math.floor(Math.random() * 9);
    board[x][y] = "-";
  }

  return board;
}

function randomNumber(numbers, clues) {
  return Math.floor(Math.random() * numbers) + clues;
}
