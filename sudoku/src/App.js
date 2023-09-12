import "./App.css";
import { useState, useEffect } from "react";
import { GameBoard } from "./components/board/GameBoard";
import { DigitsRow } from "./components/digits/DigitsRow";
import { Footer } from "./components/Footer";
import { solveSudoku } from "./utils/solveSudoku";
import { DEFAULT_BOARD } from "./config/boards";
import { Buttons } from "./components/Buttons";
import { makeDeepCopy } from "./utils/makeDeepCopy";
import { createSudoku } from "./utils/createSudoku";
import { WinScreen } from "./components/WinScreen";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { useSelectedDigit } from "./hooks/useSelectedDigit";
import { useEndGame } from "./hooks/useEndGame";

function App() {
  const [errors, setError] = useState(0);
  const [gameWon, setGameWon] = useState(0);
  const [isSolving, setIsSolving] = useState(false);
  const [winScreen, setWinScreen] = useState({ show: false, msg: "" });
  const [solution, setSolution] = useState([]);
  const [solvedNumbers, setSolvedNumbers] = useState([]);
  const [allBoards, setAllBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(DEFAULT_BOARD);
  const [initLoad, setInitLoad] = useState(true);
  const { selectedDigit, handleSelectedDigit } = useSelectedDigit();
  const { handleEndGame } = useEndGame(
    currentBoard,
    solution,
    setWinScreen,
    setGameWon,
    setAllBoards
  );

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

  const handleSelectedTile = (e) => {
    const [x, y] = e.target.getAttribute("cords").split("-");

    if (!selectedDigit) return;
    const selectedNum = Number(selectedDigit.textContent);

    if (selectedNum === solution[x][y]) {
      const copy = currentBoard[x].slice();
      copy.splice(y, 1, selectedNum);
      currentBoard[x] = copy;
      setCurrentBoard([...currentBoard]);
    } else {
      if (currentBoard[x][y] !== "-") {
        return;
      }
      setError((state) => (state += 1));
    }
  };

  const handleSolveSudoku = async () => {
    setIsSolving(true);
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (currentBoard[x][y] !== "-") {
          continue;
        }
        await new Promise((resolve) => setTimeout(resolve, 80))

        currentBoard[x][y] = solution[x][y];
        setCurrentBoard([...currentBoard]);

        setSolvedNumbers(state => [...state, [x, y]]);
      }
    }

    setIsSolving(false);
    setWinScreen(state => ({...state, msg: 'Why are you cheating'}));
  };

  const handleNextGame = () => {
    setWinScreen({ show: false, msg: "" });
  };

  return (
    <div className="wrapper">
      <h1>Sudoku</h1>
      <hr />
      <ErrorDisplay errors={errors} />

      {winScreen.show && (
        <WinScreen message={winScreen.msg} nextGame={handleNextGame} />
      )}

      <GameBoard
        board={currentBoard}
        handleSelectedTile={handleSelectedTile}
        isSolving={isSolving}
        solvedNumbers={solvedNumbers}
      />
      <DigitsRow handleSelectedDigit={handleSelectedDigit} />
      <Buttons solveSudoku={handleSolveSudoku} nextGame={handleEndGame} />
      <Footer />
    </div>
  );
}

export default App;
