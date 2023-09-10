import "./App.css";
import { useState, useEffect } from "react";
import { Digits } from "./components/Digits";
import { BoardTile } from "./components/BoardTile";
import { Footer } from "./components/Footer";
import { solveSudoku } from "./utils/solveSudoku";
import { validateBoard } from "./utils/validateBoard";
import { DEFAULT_BOARD } from "./config/boards";

function App() {
  const [errors, setError] = useState(0);
  const [selectedNum, setSelectedNum] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const [solution, setSolution] = useState([]);
  const [board, setBoard] = useState(DEFAULT_BOARD);

  useEffect(() => {
    const boardCopy = JSON.parse(JSON.stringify(board));
    const fullSolution = solveSudoku(boardCopy);

    if (fullSolution === "No solution exists.") {
      console.log("Unsolvable");
      return;
    }

    setSolution(fullSolution);
  }, []);

  useEffect(() => {
    let won = true;
    for (let x = 0; x < 9; x++) {
      for (let z = 0; z < 9; z++) {
        if (board[x][z] === "-") {
          won = false;
          return;
        }
      }
    }

    if (won) {
      setGameWon(true);
    }
  }, [board]);

  const selectedNumberHandler = (e) => {
    const target = e.target;

    if (selectedNum != null) {
      selectedNum.classList.remove("number-selected");
      setSelectedNum(null);
    }

    target.classList.add("number-selected");
    setSelectedNum(target);
  };

  const selectedTileHandler = (e) => {
    const [x, y] = e.target.getAttribute("cords").split("-");

    if (!selectedNum) return;

    if (selectedNum.textContent === solution[x][y]) {
      const copy = board[x].slice();
      copy.splice(y, 1, selectedNum.textContent);
      board[x] = copy.join("");
      setBoard([...board]);
    } else {
      setError((state) => (state += 1));
    }
  };

  const solveSudokuHandler = () => {
    setBoard([...solution]);
  };

  const onEndHandler = () => {
    console.log(validateBoard(board));
    if (!validateBoard(board)) {
      return false;
    }

    console.log("Congratulations");
  };

  return (
    <div className="wrapper">
      <h1>Sudoku</h1>
      <hr />
      <h2 id="errors">Errors: {errors}</h2>

      <div id="board">
        {board.map((row, i) =>
          Array.from(row).map((num, y) => {
            let classList = "tile";

            if (row[y] !== "-") {
              classList += " tile-start";
            }

            if (i === 2 || i === 5) {
              classList += " horizontal-line";
            }

            if (y === 2 || y === 5) {
              classList += " vertical-line";
            }

            return (
              <BoardTile
                key={`${i}${y}`}
                classList={classList}
                number={num}
                cords={`${i}-${y}`}
                tileSelect={selectedTileHandler}
              />
            );
          })
        )}
      </div>
      <br />
      <div id="digits">
        {Array(10)
          .fill(0)
          .map((smth, i) =>
            i !== 0 ? (
              <Digits key={i} num={i} selectedNum={selectedNumberHandler} />
            ) : (
              ""
            )
          )}
      </div>

      <div className="btn-wrapper">
        <button className="btns solve" onClick={solveSudokuHandler}>
          Solve
        </button>
        <button className="btns btn-nextGame" onClick={onEndHandler}>Next game</button>
      </div>

      <Footer />
    </div>
  );
}

export default App;
