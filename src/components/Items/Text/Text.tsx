import { TText } from "../../../types.ts";
import { AppDispatch } from "../../../redux/rootReducer.ts";
import { connect } from "react-redux";

interface ITextProps {
  text: TText;
  coefficient: number;
  setTextContent: (item: TText, content: string) => void;
}

function Text({ text, coefficient, setTextContent }: ITextProps): JSX.Element {
  const handleTextContent = (event: React.FormEvent<HTMLSpanElement>) => {
    const newContent = event.currentTarget.textContent || "";
    setTextContent(text, newContent);
  };
  return (
    <div
      style={{
        left: text.location.x,
        top: text.location.y,
        width: text.size.width * coefficient,
        height: text.size.height * coefficient,
        overflow: "hidden",
      }}
      onInput={handleTextContent}
      contentEditable="true"
      suppressContentEditableWarning={true}
    >
      <span
        style={{
          color: text.color,
          fontFamily: text.fontFamily,
          fontSize: text.fontSize,
          fontWeight: (text.bold && "bold") || undefined,
          fontStyle: (text.italic && "italic") || undefined,
        }}
      >
        {text.content}
      </span>
    </div>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setTextContent: (item: TText, content: string) => {
      dispatch({
        type: "SET_TEXT_CONTENT",
        payload: { item, content },
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(Text);
