import styles from "./Menu.module.css";
import { saveJsonObjToFile } from "../../../utils/save.ts";
import React, { useContext } from "react";
import { readJsonFile } from "../../../utils/readJson.ts";
import { TPresentation } from "../../../types.ts";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/rootReducer.ts";
import { CollapseToolBarContext } from "../../../context/collapseToolBar.ts";
import logo from "../../../assets/logo.png";
import addSlide from "../../../assets/addSlideCustom.svg";
import deleteSlideIcon from "../../../assets/deleteSlide.png";
import download from "../../../assets/downloadFile.png";
import open from "../../../assets/openFileCustom.svg";
import Title from "../Title/Title.tsx";

type ToolBarProps = {
  openPresentation: (data: TPresentation) => void;
  presentation: TPresentation;
  setError: (message: string) => void;
  createSlide: () => void;
  deleteSlide: () => void;
};

function Menu({ presentation, setError, createSlide, deleteSlide, openPresentation }: ToolBarProps): JSX.Element {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const file: TPresentation = (await readJsonFile(e.target.files[0])) as TPresentation;
        //console.log(file);
        openPresentation(file)
      } catch (err) {
        e.target.value = "";
        setError("Ошибка чтения JSON");
      }
    }
  };
  const findSlideById = () => presentation.slides.findIndex(slide => slide.id === presentation.currentSlide.id);

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
              < Title presentationName={presentation.name} />
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
              <div className="upload">
                <label htmlFor="openFile">
                  <img src={open} className={styles["open-icon"]} alt="Upload Icon"/>
                </label>
                <input
                    className={styles.open}
                    id="openFile"
                    type="file"
                    accept="application/json"
                    onChange={handleFileChange}
                />
              </div>
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
    openPresentation: (data: TPresentation) => {
      dispatch({
        type: "OPEN_PRESENTATION",
        payload: data,
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
