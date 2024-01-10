import styles from "./ToolBar.module.css";
import { saveJsonObjToFile } from "../../../utils/save";
import { ChangeEvent, useContext } from "react";
import { readJsonFile } from "../../../utils/readJson.ts";
import { TPresentation } from "../../../types";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/rootReducer.ts";
import { CollapseSideBarContext } from "../../../context/collapseToolBar.ts";
import logo from "../../../assets/logo.png";
import { useTheme } from "../../ThemeProvider/Theme.tsx";
import Title from "../Title/Title.tsx";

type ToolBarProps = {
  changePresentation: (presentation: TPresentation) => void;
  presentation: TPresentation;
  setError: (message: string) => void;
  createSlide: () => void;
  deleteSlide: () => void;
  deletePresentation: () => void;
};

function ToolBar({
  changePresentation,
  presentation,
  setError,
  createSlide,
  deleteSlide,
  deletePresentation,
}: ToolBarProps): JSX.Element {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
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

  const { hidden, setHidden } = useContext(CollapseSideBarContext);
  const findSlideById = () => presentation.slides.findIndex(slide => slide === presentation.currentSlide);

  const { setTheme } = useTheme();

  const handleThemeChange = () => {
    const currentTheme = localStorage.getItem("theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles["header-wrapper"]}>
          <img className={styles.logo} src={String(logo)} alt="logo" />
          <div className={styles.info}>
            <Title />
            <div className={styles.menu}>
              <button className={styles.button} onClick={() => saveJsonObjToFile(presentation)}>
                Download presentation
              </button>
              <button className={styles.button} onClick={() => deletePresentation()}>
                Delete presentation
              </button>
              <label className={[styles.button].join(" ")}>
                <input type="file" accept="application/json" name="file" onChange={handleFileChange} />
                <span>Choose presentation</span>
              </label>
              <button type="button" className={styles.theme} onClick={handleThemeChange}>
                Change theme
              </button>
            </div>
          </div>
        </div>
        <div className={styles.toolbar}>
          <p className={styles.link}>Current slide: {findSlideById() + 1}</p>
          <button className={styles.button} onClick={() => createSlide()}>
            + Add slide
          </button>
          <button className={styles.button} onClick={() => presentation.slides.length > 1 && deleteSlide()}>
            - Remove slide
          </button>
          <button
            className={[styles.button, styles.last].join(" ")}
            onClick={() => (setHidden ? setHidden(!hidden) : null)}
          >
            Editor menu
          </button>
        </div>
      </header>
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
    changePresentation: (presentation: TPresentation) => {
      dispatch({
        type: "CHANGE_PRESENTATION",
        payload: { presentation },
      });
    },
    setError: (message: string) => {
      dispatch({
        type: "",
        message, //чисто чтобы убрать ошибки
      });
    },
    deletePresentation: () => {
      dispatch({
        type: "DELETE_PRESENTATION",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
