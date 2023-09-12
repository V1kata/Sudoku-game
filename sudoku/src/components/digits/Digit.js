export function Digit({ num, selectedNum }) {
    return <div className="number" onClick={selectedNum}>{num}</div>
}
