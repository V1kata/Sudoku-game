export function Digits({ num, selectedNum }) {
    return <div className="number" onClick={selectedNum}>{num}</div>
}
