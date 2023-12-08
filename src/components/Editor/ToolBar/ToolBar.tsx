import styles from "./ToolBar.module.css";
import { saveJsonObjToFile } from "../../../utils/save";
import React from "react";
import { readJsonFile } from "../../../utils/readJson.ts";
import { TPresentation } from "../../../types";

type ToolBarProps = {
  changePresentation: (data: TPresentation) => void;
  presentation: TPresentation;
};

function ToolBar({ changePresentation, presentation }: ToolBarProps): JSX.Element {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const fileData: TPresentation = (await readJsonFile(e.target.files[0])) as TPresentation;
        changePresentation(fileData);
      } catch (e) {
        console.log("Ошибка чтения JSON");
      }
    }
  };

  const Prev = () => {
    const prev = presentation.currentSlideId - 1;
    console.log(presentation.currentSlideId);
    if (prev > 0 && prev <= presentation.slides.length) {
    }
  };

  const Next = () => {
    const next = presentation.currentSlideId + 1;
    if (next > 0 && next <= presentation.slides.length) {
    }
  };

  const GetJSONFile = () => {
    saveJsonObjToFile();
  };

  return (
    <div>
      <ul className={styles.toolbar}>
        <p>{presentation.name}</p>
        <a className={styles.link} href="#" onClick={Prev}>
          Назад
        </a>
        <a className={styles.link} href="#" onClick={Next}>
          вперед
        </a>
        <a className={styles.link} href="#">
          шрифт
        </a>
        <a className={styles.link} href="#">
          размер шрифта
        </a>
        <a className={styles.link} onClick={GetJSONFile} href="#">
          Сохранить презентацию в JSON
        </a>
        <input type="file" accept="application/json" onChange={handleFileChange} />
      </ul>
    </div>
  );
}

export default ToolBar;
