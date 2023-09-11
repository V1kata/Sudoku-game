export function WinScreen({ message, nextGame }) {
  return (
    <div className="overlay">
      <div className="message-container">
        <h2>{message}</h2>
        
        <button className="btns" onClick={nextGame}>Next game?</button>
      </div>
    </div>
  );
}
