import { EMPTY_BOARD } from "../config/boards";
import { makeDeepCopy } from "./makeDeepCopy";
import { solveSudoku } from "./solveSudoku";
import { areNotEqualBoards, validateBoard } from "./validateBoard";

export function createSudoku(allBoards) {
  const boardForModifieing = makeDeepCopy(EMPTY_BOARD);
  let newBoard = modifyBoard(boardForModifieing);

  for (let i = 0; i < allBoards.length; i++) {
    const board = allBoards[i];

    if (areNotEqualBoards(board, newBoard)) {
    //   newBoard = solveSudoku(modifyBoard(newBoard));
      console.log("Oooof, not good");
    }
  }
  const solvedBoard = solveSudoku(newBoard);
  console.log(solvedBoard);

  return newBoard;
}

function modifyBoard(board) {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      let num = generateRandomNumber(9, 1); // Random number
      let xOrY = generateRandomNumber(2, 1); // Randomly choose to modify row (1) or column (2)

      if ((xOrY === 1 && x === num) || (xOrY === 2 && y === num)) {
        const boardCopy = makeDeepCopy(board);
        boardCopy[x][y] = num;
        console.log(validateBoard(boardCopy));
        if (!validateBoard(boardCopy)) {
          board = boardCopy;
          num = generateRandomNumber(9, 1);
        }
      }
    }
  }

  return board;
}

function makeWhiteSpaces(board) {
  const numToRemove = generateRandomNumber();

  for (let i = 0; i < numToRemove; i++) {
    const x = Math.floor(Math.random() * 9);
    const y = Math.floor(Math.random() * 9);
    board[x][y] = "-";
  }

  return board;
}

function generateRandomNumber(numbers, clues) {
  return Math.floor(Math.random() * numbers) + clues;
}
