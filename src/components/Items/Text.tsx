import { TText } from "../../types";

interface ITextProps {
  text: TText;
}

function Text(props: ITextProps): JSX.Element {
  const text = props.text;
  return (
    <>
      <foreignObject x={text.location.x} y={text.location.y} width={text.size.width} height={text.size.height}>
        <div contentEditable="true">
          <p>
            {text.content.map(char => (
              <span
                key={char.id}
                style={{
                  fill: char.color,
                  fontFamily: "sans-serif",
                }}
              >
                {char.bold && char.symbol}
                {char.italic && char.symbol}
                {!char.italic && !char.bold && char.symbol}
              </span>
            ))}
          </p>
        </div>
      </foreignObject>
    </>
  );
}

export default Text;
