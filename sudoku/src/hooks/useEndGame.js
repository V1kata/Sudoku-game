export function useEndGame(
  currentBoard,
  solution,
  setWinScreen,
  setGameWon,
  setAllBoards
) {
  const handleEndGame = () => {
    let won = true;
    for (let x = 0; x < 9; x++) {
      for (let z = 0; z < 9; z++) {
        if (currentBoard[x][z] === "-") {
          won = false;
          console.log("Not done yet, keep trying!");
          return; // Exit the loop and function early
        }
      }
    }

    if (won) {
      setWinScreen((state) => 
      state.msg ? {...state, show: true } : { show: true, msg: "You win" });

      setGameWon((state) => (state += 1));
    }

    console.log("Congratulations, you win!");
    setAllBoards((state) => [...state, solution]);
  };

  return { handleEndGame };
}
