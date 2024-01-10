import { TText } from "../../../types.ts";

import { CSSProperties, useEffect, useRef, useState } from "react";

interface ITextProps {
  text: TText;
  setTextContent: (content: string) => void;
}

function Text({ text, setTextContent }: ITextProps): JSX.Element {
  const [content, setContent] = useState(text.content);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setTextContent(content);
    /* textAreaRef.current.style.paddingTop = `${height}px`
    textAreaRef.current.style.paddingBottom = `${height}px`*/
  }, [content]);

  const style: CSSProperties = {
    left: text.location.x,
    top: text.location.y,
    width: "100%",
    height: "auto",
    overflow: "hidden",
    color: text.color,
    fontFamily: text.fontFamily,
    fontSize: text.fontSize,
    fontWeight: (text.bold && "bold") || undefined,
    fontStyle: (text.italic && "italic") || undefined,
    resize: "none",
    border: "none",
    outline: "none",
    background: "transparent",
    textAlign: "center",
    whiteSpace: "pre-line",
    /*paddingTop: `${text.size.height/4 }px`, //ВОЗМОЖНО ПРИГОДИТСЯ, ТЕКСТ ПО ЦЕНТРУ
    paddingBottom: `${text.size.height/3}px`,*/
  };

  return <textarea ref={textAreaRef} style={style} value={text.content} onChange={e => setContent(e.target.value)} />;
}

export default Text;
