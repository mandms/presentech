import { TText } from "../../types";

interface ITextProps {
  text: TText;
}

function Text(props: ITextProps): JSX.Element {
  const text = props.text;
  return (
    <>
      <foreignObject x={text.location.x} y={text.location.y} width={text.size.width} height={text.size.height}>
        <div contentEditable="true" suppressContentEditableWarning={true}>
          <p>
            {text.content.map(char => (
              <span
                key={char.id}
                style={{
                  fill: char.color,
                  fontFamily: char.fontFamily,
                  fontWeight: char.bold && "bold",
                  fontStyle: char.italic && "italic",
                }}
              >
                {char.symbol}
              </span>
            ))}
          </p>
        </div>
      </foreignObject>
    </>
  );
}

export default Text;
