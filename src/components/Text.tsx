import { TText } from "../types";

interface ITextProps {
  text: TText;
}

function Text(props: ITextProps): JSX.Element {
  const text = props.text;
  return (
    <>
      <div
        contentEditable={"true"}
        suppressContentEditableWarning={true}
        draggable={"true"}
        style={{
          left: text.location.x,
          top: text.location.y,
          position: "absolute",
          resize: "both",
        }}
      >
        {text.content.map(char => (
          <span key={char.id}>
            {char.bold && <strong>{char.symbol}</strong>}
            {char.italic && <i>{char.symbol}</i>}
            {!char.italic && !char.bold && char.symbol}
          </span>
        ))}
      </div>
    </>
  );
}

export default Text;
