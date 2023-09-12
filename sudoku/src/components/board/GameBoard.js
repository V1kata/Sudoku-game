import { BoardTile } from './BoardTile';

export function GameBoard({ board, solvedNumbers, handleSelectedTile, isSolving }) {
  return (
    <>
    <div id="board">
      {board.map((row, i) =>
        Array.from(row).map((num, y) => {
          let classList = "tile ";

          if (row[y] !== "-") {
            classList += " solved-tile";
          }

          if (i === 2 || i === 5) {
            classList += " horizontal-line";
          }

          if (y === 2 || y === 5) {
            classList += " vertical-line";
          }

          if (solvedNumbers.some(([x, z]) => x === i && z === y)) {
            classList += " solved"
          }

          return (
            <BoardTile
              key={`${i}${y}`}
              classList={classList}
              number={num}
              cords={`${i}-${y}`}
              tileSelect={handleSelectedTile}
            />
          );
        })
      )}
    </div>
    <br />
    </>
  );
}
