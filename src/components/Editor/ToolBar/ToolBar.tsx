import styles from "./ToolBar.module.css";
import { saveJsonObjToFile } from "../../../utils/save";
import React from "react";
import { readJsonFile } from "../../../utils/readJson.ts";
import { TPresentation } from "../../../types";
import arrow1 from "C:/Users/masha/source/repos/presentech/src/components/Editor/Icon/arrow1.png";
import arrow2 from "C:/Users/masha/source/repos/presentech/src/components/Editor/Icon/arrow2.png";
import text from "C:/Users/masha/source/repos/presentech/src/components/Editor/Icon/text.png";
import image from "C:/Users/masha/source/repos/presentech/src/components/Editor/Icon/image.png";
import shape from "C:/Users/masha/source/repos/presentech/src/components/Editor/Icon/shape.png";

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
      <div className={styles.toolbar}>
        <div class={styles.namePresentation}><p>{presentation.name}</p></div>
        <div class={styles.menu}>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Файл</button>
            <div className={styles.dropdownContent}>
              <div className={styles.miniMenu}>
                <a className={styles.link} onClick={GetJSONFile} href="#">
                  Сохранить...
                </a>
                <a className={styles.link} onClick={GetJSONFile} href="#">
                  <label htmlFor="input__file" accept="application/json" onChange={handleFileChange}>Открыть...</label>
                </a>
              </div>
            </div>
          </div>
          <a className={styles.plusSlide} href="#">+</a>
          <a className={styles.link} href="#" onClick={Prev}>
            <img src={arrow1} width="25" height="25" alt=" "/>
          </a>
          <a className={styles.link} href="#" onClick={Next}>
            <img src={arrow2} width="25" height="25"/>
          </a>
          <a className={styles.link} href="#" onClick={Next}>
            <img src={text} width="25" height="25"/>
          </a>
          <a className={styles.link} href="#" onClick={Next}>
            <img src={image} width="25" height="25"/>
          </a>
          <a className={styles.link} href="#" onClick={Next}>
            <img src={shape} width="25" height="25"/>
          </a>
          <a className={styles.link} href="#">
            шрифт
          </a>
          <a className={styles.link} href="#">
            размер шрифта
          </a>
        </div>
      </div>
    </div>
  );
}

export default ToolBar;
