import styles from "./ToolBar.module.css";
import { saveJsonObjToFile } from "../../../utils/save";
import React from "react";
import { readJsonFile } from "../../../utils/readJson.ts";
import { ShapeType, TLocation, TPresentation } from "../../../types";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/rootReducer.ts";

type ToolBarProps = {
  changePresentation: (data: TPresentation) => void;
  presentation: TPresentation;
  setError: (message: string) => void;
  setCurrentSlideById: (id: number) => void;
  addSlide: () => void;
  addPrimitive: (shapeType: ShapeType, location: TLocation, slideId: number) => void;
};

function ToolBar({
  changePresentation,
  presentation,
  setError,
  setCurrentSlideById,
  addSlide,
  addPrimitive,
}: ToolBarProps): JSX.Element {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const fileData: TPresentation = (await readJsonFile(e.target.files[0])) as TPresentation;
        changePresentation(fileData);
        if (e.target.nextElementSibling) e.target.nextElementSibling.innerHTML = e.target.files[0].name;
      } catch (err) {
        e.target.value = "";
        setError("Ошибка чтения JSON");
      }
    }
  };

  const Prev = () => {
    const prev = presentation.currentSlideId - 1;
    if (prev >= 0 && prev <= presentation.slides.length) {
      setCurrentSlideById(prev);
    }
  };

  const Next = () => {
    const next = presentation.currentSlideId + 1;
    if (next >= 0 && next < presentation.slides.length) {
      setCurrentSlideById(next);
    }
  };

  const GetJSONFile = () => {
    saveJsonObjToFile(presentation);
  };

  return (
    <div>
      <ul className={styles.toolbar}>
        <p>{presentation.name}</p>
        <p className={styles.link}>Текущий слайд: {presentation.currentSlideId}</p>
        <li>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Примитивы</button>
            <div className={styles.primitives}>
              <a href="#" onClick={() => addPrimitive(ShapeType.Triangle, { x: 40, y: 50 }, 1)}>
                Квадрат
              </a>
              <a href="#">Круг</a>
              <a href="#">Треугольник</a>
            </div>
          </div>
        </li>
        <a className={styles.link} href="#" onClick={Prev}>
          Назад
        </a>
        <a className={styles.link} href="#" onClick={Next}>
          вперед
        </a>
        <a className={styles.link} href="#" onClick={() => addSlide()}>
          + Добавить слайд
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
        <label className={styles["input-file"]}>
          <input type="file" accept="application/json" name="file" onChange={handleFileChange} />
          <span>Выберите файл</span>
        </label>
      </ul>
    </div>
  );
}
const mapStateToProps = (state: RootState) => {
  return {
    presentation: state.presentation,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    addSlide: () => {
      dispatch({
        type: "CREATE_SLIDE",
      });
    },
    addPrimitive: (shapeType: ShapeType, location: TLocation, slideId: number) => {
      dispatch({
        type: "ADD_PRIMITIVE",
        payload: { shapeType, location, slideId },
      });
    },
    changePresentation: (data: TPresentation) => {
      dispatch({
        type: "",
        data, //чисто чтобы убрать ошибки
      });
    },
    setError: (message: string) => {
      dispatch({
        type: "",
        message, //чисто чтобы убрать ошибки
      });
    },
    setCurrentSlideById: (id: number) => {
      dispatch({
        type: "",
        id, //чисто чтобы убрать ошибки
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
