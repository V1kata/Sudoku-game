import { EMPTY_BOARD } from "../config/boards";
import { makeDeepCopy } from "./makeDeepCopy";
import { solveSudoku } from "./solveSudoku";
import { areNotEqualBoards, validateBoard } from "./validateBoard";

export function createSudoku(allBoards) {
  const boardForModifying = makeDeepCopy(EMPTY_BOARD);
  let newBoard = modifyBoard(boardForModifying);

  for (let i = 0; i < allBoards.length; i++) {
    const board = allBoards[i];
    const solvedBoard = solveSudoku(newBoard);

    if (!areNotEqualBoards(board, solvedBoard)) {
      console.log("Oooof, not good");
      newBoard = modifyBoard(newBoard);
      i = -1;
    }
    console.log(solvedBoard);
  }

  return makeWhiteSpaces(newBoard);
}

function modifyBoard(board) {
  let num = generateRandomNumber(4, 0); // Random number
  let xOrY = generateRandomNumber(2, 1); // Randomly choose to modify row (1) or column (2)

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      num = generateRandomNumber(xOrY === 2 ? y : 9, 1); // Random number
      xOrY = generateRandomNumber(2, 1);

      if ((xOrY === 1 && x === num) || (xOrY === 2 && y === num)) {
        const boardCopy = makeDeepCopy(board);
        boardCopy[x][y] = num;
        if (validateBoard(boardCopy)) {
          console.log(boardCopy);
          board = boardCopy;
          num = generateRandomNumber(9, 1);
        }
      }
    }
  }

  return board;
}

function makeWhiteSpaces(board) {
  const numToRemove = generateRandomNumber(10, 40);

  for (let i = 0; i < numToRemove; i++) {
    const x = generateRandomNumber(9, 0);
    const y = generateRandomNumber(9, 0);
    board[x][y] = "-";
  }

  return board;
}

function generateRandomNumber(numbers, clues) {
  return Math.floor(Math.random() * numbers) + clues;
}
