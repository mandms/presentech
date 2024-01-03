import styles from "./ToolBar.module.css";
import { saveJsonObjToFile } from "../../../utils/save";
import React, { useContext } from "react";
import { readJsonFile } from "../../../utils/readJson.ts";
import { TPresentation } from "../../../types";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/rootReducer.ts";
import { CollapseToolBarContext } from "../../../context/collapseToolBar.ts";

type ToolBarProps = {
  changePresentation: (data: TPresentation) => void;
  presentation: TPresentation;
  setError: (message: string) => void;
  createSlide: () => void;
  deleteSlide: () => void;
};

function ToolBar({ changePresentation, presentation, setError, createSlide, deleteSlide }: ToolBarProps): JSX.Element {
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

  const findSlideById = () => presentation.slides.findIndex(slide => slide.id === presentation.currentSlideId);

  const GetJSONFile = () => {
    saveJsonObjToFile(presentation);
  };
  const { hidden, setHidden } = useContext(CollapseToolBarContext);

  return (
    <>
      <ul className={styles.toolbar}>
        <p>{presentation.name}</p>
        <p className={styles.link}>Текущий слайд: {findSlideById() + 1}</p>
        <a className={styles.link} href="#" onClick={() => createSlide()}>
          + Добавить слайд
        </a>
        <a className={styles.link} href="#" onClick={() => deleteSlide()}>
          - Удалить слайд
        </a>
        <a className={styles.link} onClick={GetJSONFile} href="#">
          Сохранить презентацию в JSON
        </a>
        <label className={styles["input-file"]}>
          <input type="file" accept="application/json" name="file" onChange={handleFileChange} />
          <span>Выберите файл</span>
        </label>
        <button
          className={[styles.link, styles.collapse].join(" ")}
          onClick={() => (setHidden ? setHidden(!hidden) : null)}
        >
          Editor Menu
        </button>
      </ul>
    </>
  );
}
const mapStateToProps = (state: RootState) => {
  return {
    presentation: state.presentation,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    createSlide: () => {
      dispatch({
        type: "CREATE_SLIDE",
      });
    },
    deleteSlide: () => {
      dispatch({
        type: "DELETE_SLIDE",
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
