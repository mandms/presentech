import { TEditor } from "../../types";
import Presentation from "../Presentation/Presentation";
import styles from "./Editor.module.css";

interface IEditorProps {
  editor: TEditor;
}

function Editor(props: IEditorProps): JSX.Element {
  const editor = props.editor;
  return (
    <>
      <div>
        <ul className={styles.toolbar}>
          <a className={styles.link} href="#">
            Назад
          </a>
          <a className={styles.link} href="#">
            вперед
          </a>
          <a className={styles.link} href="#">
            шрифт
          </a>
          <a className={styles.link} href="#">
            размер шрифта
          </a>
        </ul>
      </div>
      <Presentation presentation={editor.presentation} />
    </>
  );
}

export default Editor;
