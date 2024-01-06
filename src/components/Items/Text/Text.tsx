import { TText } from "../../../types.ts";

interface ITextProps {
  text: TText;
  coefficient: number;
}

function Text({ text, coefficient }: ITextProps): JSX.Element {
  return (
    <div
      style={{
        left: text.location.x,
        top: text.location.y,
        width: text.size.width * coefficient,
        height: text.size.height * coefficient,
        overflow: "hidden",
      }}
      contentEditable="true"
      suppressContentEditableWarning={true}
    >
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
    </div>
  );
}

export default Text;
