import styles from "./ToolBar.module.css";
import { saveJsonObjToFile } from "../../../utils/save";
import { ChangeEvent, useContext } from "react";
import { readJsonFile } from "../../../utils/readJson.ts";
import { ShapeType, TPosition, TPresentation, TSlide } from "../../../types";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/rootReducer.ts";
import { CollapseSideBarContext } from "../../../context/collapseToolBar.ts";
import logo from "../../../assets/logo.png";
import { toBase64 } from "../../../utils/image.ts";
import { useTheme } from "../../ThemeProvider/Theme.tsx";
import Title from "../Title/Title.tsx";

type ToolBarProps = {
  changePresentation: (presentation: TPresentation) => void;
  presentation: TPresentation;
  setError: (message: string) => void;
  createSlide: () => void;
  deleteSlide: () => void;
  deletePresentation: () => void;
  addPrimitive: (shapeType: ShapeType, location: TPosition, slide: TSlide) => void;
  addText: (text: string, location: TPosition, slide: TSlide) => void;
  addImage: (path: string, location: TPosition, dimensions: { width: number; height: number }, slide: TSlide) => void;
};

function ToolBar({
  changePresentation,
  presentation,
  setError,
  createSlide,
  deleteSlide,
  deletePresentation,
  addPrimitive,
  addText,
  addImage,
}: ToolBarProps): JSX.Element {
  const coords = { x: 100, y: 100 };
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

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const base64 = await toBase64(files[0]);
      const img = new Image();
      img.onload = () => {
        const dimensions = { width: img.width, height: img.height };
        addImage(base64, { x: coords.x, y: coords.y }, dimensions, presentation.currentSlide);
      };
      img.src = URL.createObjectURL(files[0]);
    }
    event.target.value = "";
  };

  const addFigure = (type: ShapeType) => {
    switch (type) {
      case ShapeType.Circle:
        return addPrimitive(ShapeType.Circle, { x: coords.x, y: coords.y }, presentation.currentSlide);
      case ShapeType.Triangle:
        return addPrimitive(ShapeType.Triangle, { x: coords.x, y: coords.y }, presentation.currentSlide);
      case ShapeType.Square:
        return addPrimitive(ShapeType.Square, { x: coords.x, y: coords.y }, presentation.currentSlide);
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
          <div className={styles.divider}></div>
          <button
            className={styles.button}
            onClick={() => addText("Text", { x: coords.x, y: coords.y }, presentation.currentSlide)}
          >
            + Add text
          </button>
          <button className={styles.button} onClick={() => addFigure(ShapeType.Circle)}>
            + Add circle
          </button>
          <button className={styles.button} onClick={() => addFigure(ShapeType.Square)}>
            + Add square
          </button>
          <button className={styles.button} onClick={() => addFigure(ShapeType.Triangle)}>
            + Add triangle
          </button>
          <div className={styles.divider}></div>
          <label className={styles.button}>
            <input type="file" accept="image/*" onChange={handleImage} />
            <span>+ Add image</span>
          </label>
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
    addPrimitive: (shapeType: ShapeType, location: TPosition, slide: TSlide) => {
      dispatch({
        type: "ADD_PRIMITIVE",
        payload: { shapeType, location, slide },
      });
    },
    addText: (text: string, location: TPosition, slide: TSlide) => {
      dispatch({
        type: "ADD_TEXT",
        payload: { text, location, slide },
      });
    },
    addImage: (path: string, location: TPosition, dimensions: { width: number; height: number }, slide: TSlide) => {
      dispatch({
        type: "ADD_IMAGE",
        payload: { path, location, dimensions, slide },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
