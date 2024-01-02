import styles from "./SideBar.module.css";
import React, { useContext, useState } from "react";
import { ShapeType, TPosition, TPresentation } from "../../../types.ts";
import { AppDispatch, RootState } from "../../../redux/rootReducer.ts";
import { connect } from "react-redux";
import { CollapseToolBarContext } from "../../../context/collapseToolBar.ts";

type SideBarProps = {
  presentation: TPresentation;
  addPrimitive: (shapeType: ShapeType, location: TPosition, slideId: string) => void;
  addText: (text: string, location: TPosition, slideId: string) => void;
  addBackground: (path: string, slideId: string) => void;
  addImage: (path: string, location: TPosition, dimensions: { width:number, height:number }, slideId: string) => void;
};
function SideBar({ presentation, addPrimitive, addText, addBackground, addImage }: SideBarProps): JSX.Element {
  const [showPrimitives, setShowPrimitives] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const { hidden } = useContext(CollapseToolBarContext);

  const handleBackgroundImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const path = URL.createObjectURL(file);
      addBackground( path, presentation.currentSlideId);
    }
  };

  const coords = {x: 10, y: 10};

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const path = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const dimensions = {width: img.width, height: img.height};
        addImage( path, { x: coords.x, y: coords.y }, dimensions, presentation.currentSlideId);
      }
      img.src = path;
    }
  };
  const addFigure = (type: ShapeType) => {
    switch (type) {
      case ShapeType.Circle:
        return addPrimitive(ShapeType.Circle, { x: coords.x, y: coords.y }, presentation.currentSlideId);
      case ShapeType.Triangle:
        return addPrimitive(ShapeType.Triangle, { x: coords.x, y: coords.y }, presentation.currentSlideId);
      case ShapeType.Square:
        return addPrimitive(ShapeType.Square, { x: coords.x, y: coords.y }, presentation.currentSlideId);
    }
  };

  return (
      <div className={hidden ? [styles.sidebar, styles.hide].join(" ") : styles.sidebar}>
        <button className={styles.item}
                onClick={() => addText("Text", {x: coords.x, y: coords.y}, presentation.currentSlideId)}>
          Text
        </button>
        <button className={styles.item} onClick={() => setShowPrimitives(!showPrimitives)}>
          Primitives
        </button>
        <div className={[styles.container, !showPrimitives && styles["container-hidden"]].join(" ")}>
          <button className={styles.item} onClick={() => addFigure(ShapeType.Square)}>
            Square
          </button>
          <button className={styles.item} onClick={() => addFigure(ShapeType.Circle)}>
            Circle
          </button>
          <button className={styles.item} onClick={() => addFigure(ShapeType.Triangle)}>
            Triangle
          </button>
        </div>
        <button className={styles.item} onClick={() => setShowImage(!showImage)}>
          Image
        </button>
        <div className={[styles.container, !showImage && styles["container-hidden"]].join(" ")}>
          <label className={styles.item}>
            <span>Choose an image</span>
            <input type="file" accept="image/*" onChange={handleImage}/>
          </label>
        </div>
        <button className={styles.item} onClick={() => setShowBack(!showBack)}>
          Background
        </button>
        <div className={[styles.container, !showBack && styles["container-hidden"]].join(" ")}>
          <label className={styles.item}>
            <span>Choose an image</span>
            <input type="file" accept="image/*" onChange={handleBackgroundImageChange}/>
          </label>
        </div>
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
    addPrimitive: (shapeType: ShapeType, location: TPosition, slideId: string) => {
      dispatch({
        type: "ADD_PRIMITIVE",
        payload: {shapeType, location, slideId},
      });
    },
    addText: (text: string, location: TPosition, slideId: string) => {
      dispatch({
        type: "ADD_TEXT",
        payload: { text, location, slideId },
      });
    },
    addBackground: (path: string, slideId: string) => {
      dispatch({
        type: "ADD_BACKGROUND",
        payload: { path, slideId },
      });
    },
    addImage: (path: string, location: TPosition, dimensions: { width:number, height:number }, slideId: string) => {
      dispatch({
        type: "ADD_IMAGE",
        payload: { path, location, dimensions, slideId },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
