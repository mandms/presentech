import { TEditor } from "../types";
import Presentation from "./Presentation";
import "./Editor.css";

interface IEditorProps {
  editor: TEditor;
}

function Editor(props: IEditorProps): JSX.Element {
  const editor = props.editor;
  return (
    <>
      <div>
        <ul className="toolbar">
          <li>
            <a href="#">Назад</a>
          </li>
          <li>
            <a href="#">вперед</a>
          </li>
          <li>
            <a href="#">шрифт</a>
          </li>
          <li>
            <a href="#">размер шрифта</a>
          </li>
        </ul>
      </div>
      <Presentation presentation={editor.presentation} />
    </>
  );
}

export default Editor;
