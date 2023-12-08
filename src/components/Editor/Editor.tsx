import { TEditor, TPresentation } from "../../types";
import Presentation from "../Presentation/Presentation";
import ToolBar from "./ToolBar/ToolBar";
import { useState } from "react";

interface IEditorProps {
  editor: TEditor;
}

function Editor(props: IEditorProps): JSX.Element {
  const editor = props.editor;
  const [presentation, setPresentation] = useState(editor.presentation);
  const changePresentation = (data: TPresentation) => {
    setPresentation(data);
  };

  return (
    <>
      <ToolBar changePresentation={changePresentation} presentation={presentation} />
      <Presentation presentation={presentation} />
    </>
  );
}

export default Editor;
