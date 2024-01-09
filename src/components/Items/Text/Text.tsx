import { TText } from "../../../types.ts";

import { CSSProperties, useEffect, useState } from "react";

interface ITextProps {
  text: TText;
  setTextContent: (content: string) => void;
}

function Text({ text, setTextContent }: ITextProps): JSX.Element {
  const [content, setContent] = useState(text.content);

  useEffect(() => {
    setTextContent(content);
  }, [content]);

  const style: CSSProperties = {
    left: text.location.x,
    top: text.location.y,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    color: text.color,
    fontFamily: text.fontFamily,
    fontSize: text.fontSize,
    fontWeight: (text.bold && "bold") || undefined,
    fontStyle: (text.italic && "italic") || undefined,
    resize: "none",
    border: "none",
    boxSizing: "border-box",
    outline: "none",
    background: "transparent",
    textAlign: "center",
    whiteSpace: "pre-line",
    /*paddingTop: `${text.size.height/2}px`, //ВОЗМОЖНО ПРИГОДИТСЯ, ТЕКСТ ПО ЦЕНТРУ
    paddingBottom: `${text.size.height/2}px`,
    paddingLeft: `${text.size.width/2}px`,
    paddingRight: `${text.size.width/2}px`,*/
  };

  return <textarea style={style} value={text.content} onChange={e => setContent(e.target.value)} />;
}

export default Text;
