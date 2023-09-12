import { Digit } from './Digit';

export function DigitsRow({ handleSelectedDigit }) {
  return (
    <>
    <div id="digits">
      {Array(10)
        .fill(0)
        .map((smth, i) =>
          i !== 0 ? (
            <Digit key={i} num={i} selectedNum={handleSelectedDigit} />
          ) : (
            ""
          )
        )}
    </div>
    <br />
    </>
  );
}
