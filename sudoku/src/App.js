import "./App.css";
import { useState, useEffect } from "react";
import { Digits } from "./components/Digits";
import { BoardTile } from "./components/BoardTile";
import { Footer } from "./components/Footer";
import { solveSudoku } from "./utils/solveSudoku";
import { DEFAULT_BOARD } from "./config/boards";
import { Buttons } from "./components/Buttons";
import { makeDeepCopy } from "./utils/makeDeepCopy";
import { createSudoku } from "./utils/createSudoku";
import { WinScreen } from "./components/WinScreen";

function App() {
  const [errors, setError] = useState(0);
  const [selectedDigit, setSelectedDigit] = useState(null);
  const [gameWon, setGameWon] = useState(0);
  const [winScreen, setWinScreen] = useState({ show: false, msg: "" });
  const [solution, setSolution] = useState([]);
  const [allBoards, setAllBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(DEFAULT_BOARD);
  const [initLoad, setInitLoad] = useState(true);

  useEffect(() => {
    if (initLoad) {
      return setInitLoad(false);
    }

    const newBoard = createSudoku(allBoards);

    setCurrentBoard(newBoard);
  }, [gameWon]);

  useEffect(() => {
    const boardCopy = makeDeepCopy(currentBoard);
    const fullSolution = solveSudoku(boardCopy);

    if (fullSolution === "No solution exists.") {
      console.log("Unsolvable");
      return;
    }

    setSolution(fullSolution);
  }, [currentBoard]);

  useEffect(() => {}, [currentBoard]);

  const selectedNumberHandler = (e) => {
    const target = e.target;

    if (selectedDigit != null) {
      selectedDigit.classList.remove("number-selected");
      setSelectedDigit(null);
    }

    target.classList.add("number-selected");
    setSelectedDigit(target);
  };

  const selectedTileHandler = (e) => {
    const [x, y] = e.target.getAttribute("cords").split("-");

    if (!selectedDigit) return;
    const selectedNum = Number(selectedDigit.textContent);

    if (selectedNum === solution[x][y]) {
      const copy = currentBoard[x].slice();
      copy.splice(y, 1, selectedNum);
      currentBoard[x] = copy;
      setCurrentBoard([...currentBoard]);
    } else {
      setError((state) => (state += 1));
    }
  };

  const solveSudokuHandler = () => {
    setCurrentBoard([...solution]);
  };

  const nextGameHandler = () => {
    setWinScreen({ show: false, msg: "" });
    // setTimeout(() => {
      //   setWinScreen({ show: false, msg: "" });
    // }, 1500);
  };

  const endGameHandler = () => {
    let won = true;
    for (let x = 0; x < 9; x++) {
      for (let z = 0; z < 9; z++) {
        if (currentBoard[x][z] === "-") {
          won = false;
          return console.log("Not done yet, keep trying!");
        }
      }
    }
    
    if (won) {
      setWinScreen({ show: true, msg: "You win!" });
      setGameWon((state) => (state += 1));
    }
    
    console.log("Congratulations, you win!");
    setAllBoards((state) => [...state, solution]);
  };

  return (
    <div className="wrapper">
      <h1>Sudoku</h1>
      <hr />
      <h2 id="errors">Errors: {errors}</h2>

      {winScreen.show && <WinScreen message={winScreen.msg} nextGame={nextGameHandler}/>}

      <div id="board">
        {currentBoard.map((row, i) =>
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
              <Digits
                key={i}
                num={i}
                selectedNum={selectedNumberHandler}
              />
            ) : (
              ""
            )
          )}
      </div>

      <Buttons solveSudoku={solveSudokuHandler} nextGame={endGameHandler} />

      <Footer />
    </div>
  );
}

export default App;
