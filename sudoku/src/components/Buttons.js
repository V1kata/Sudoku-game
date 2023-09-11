export function Buttons({ solveSudoku, nextGame }) {
  return (
    <div className="btn-wrapper">
      <button className="btns solve" onClick={solveSudoku}>
        Solve
      </button>
      <button className="btns btn-nextGame" onClick={nextGame}>
        End game
      </button>
    </div>
  );
}
