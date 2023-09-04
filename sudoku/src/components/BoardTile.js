export function BoardTile({ classList, number, cords, tileSelect }) {
    return <div className={classList} cords={cords} onClick={tileSelect}>{number !== '-' ? number : ''}</div>
}