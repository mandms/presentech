import { TText } from "../../types";
import { minWidth } from "@material-ui/system";

interface ITextProps {
  text: TText;
  coefficient: number;
}

function Text({ text, coefficient }: ITextProps): JSX.Element {
  return (
    <>
      <foreignObject
        x={text.location.x}
        y={text.location.y}
        width={text.size.width * coefficient}
        height={text.size.height * coefficient}
      >
        <div contentEditable="true" suppressContentEditableWarning={true} style={ {minWidth:100} }>
          <p>
            {text.content.map(char => (
              <span
                key={char.id}
                style={{
                  fill: char.color,
                  fontFamily: char.fontFamily,
                  fontWeight: (char.bold && "bold") || undefined,
                  fontStyle: (char.italic && "italic") || undefined,
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
