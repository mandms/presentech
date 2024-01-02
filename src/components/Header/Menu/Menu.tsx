import styles from "./Menu.module.css";
import { saveJsonObjToFile } from "../../../utils/save.ts";
import React, { useContext } from "react";
import { readJsonFile } from "../../../utils/readJson.ts";
import { TPresentation } from "../../../types.ts";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/rootReducer.ts";
import { CollapseToolBarContext } from "../../../context/collapseToolBar.ts";
import logo from "../../../assets/logo.png";
import addSlide from "../../../assets/addSlide.png";
import deleteSlideIcon from "../../../assets/deleteSlide.png";
import download from "../../../assets/downloadFile.png";
import open from "../../../assets/openFile.png";
import Title from "../Title/Title.tsx";

type ToolBarProps = {
  changePresentation: (data: TPresentation) => void;
  presentation: TPresentation;
  setError: (message: string) => void;
  createSlide: () => void;
  deleteSlide: () => void;
};

function Menu({ changePresentation, presentation, setError, createSlide, deleteSlide }: ToolBarProps): JSX.Element {
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
      <div>
        <ul className={styles.toolbar}>
          <div className={styles.left}>
            <div className={styles.about}>
              <a href="#">
                <img className={styles.logo} src={logo}/>
              </a>
              < Title />
            </div>
            <div className={styles.current}>
              <p className={styles.link}>Текущий слайд: {findSlideById() + 1}</p>
              <a href="#" onClick={() => createSlide()}>
                <img className={styles.add} src={addSlide}/>
              </a>
              <a href="#" onClick={() => deleteSlide()}>
                <img className={styles.delete} src={deleteSlideIcon}/>
              </a>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.file}>
              <a className={styles.link} onClick={GetJSONFile} href="#">
              <img className={styles.download} src={download}/>
              </a>
              <label className={styles["input-file"]}>
                <input type="image" src={open} className={styles.open} accept="application/json" name="file" onChange={handleFileChange}/>
              </label>
            </div>
            <button
                className={[styles.input, styles.collapse].join(" ")}
                onClick={() => (setHidden ? setHidden(!hidden) : null)}
            >
              Editor
            </button>
          </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
