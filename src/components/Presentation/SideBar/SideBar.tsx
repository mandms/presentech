import styles from "./SideBar.module.css";
import React, {useContext, useState} from "react";
import {ShapeType, TItem, TPosition, TPresentation, TShape, TSlide, TText} from "../../../types.ts";
import { AppDispatch, RootState } from "../../../redux/rootReducer.ts";
import { connect } from "react-redux";
import { CollapseToolBarContext } from "../../../context/collapseToolBar.ts";

type SideBarProps = {
  presentation: TPresentation;
  addPrimitive: (shapeType: ShapeType, location: TPosition, slide: TSlide) => void;
  addText: (text: string, location: TPosition, slide: TSlide) => void;
  addBackground: (path: string, slide: TSlide) => void;
  updateBackgroundColorSlide: (slide: TSlide, color: string) => void;
  addImage: (path: string, location: TPosition, dimensions: { width: number; height: number }, slide: TSlide) => void;
  deleteItem: (slide: TSlide) => void;
  updateBackgroundColor: (item: TShape | null, color: string) => void;
  updateBorderColor: (item: TShape | null, color: string) => void;
};

function SideBar({
  presentation,
  addPrimitive,
  addText,
  addBackground,
  updateBackgroundColorSlide,
  addImage,
  deleteItem,
  updateBackgroundColor,
  updateBorderColor,
}: SideBarProps): JSX.Element {
  const selectedItem = presentation.currentSlide.selectedItem;
  const { hidden } = useContext(CollapseToolBarContext);
  const [sidebar, setSidebar] = useState({
    showPrimitives: false,
    showBack: false,
    showImage: false,
  });

  const handleBackgroundImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const path = URL.createObjectURL(files[0]);
      addBackground(path, presentation.currentSlide);
    }
    event.target.value = "";
  };

  const handleBackgroundColorSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("we are here");
    const color = event.target.value;
    console.log(color);
    updateBackgroundColorSlide( presentation.currentSlide, color);
  };

  const handleBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    updateBackgroundColor( selectedItem  as TShape, color);
  };
  const handleBorderColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    updateBorderColor( selectedItem  as TShape, color);
  };

  const coords = { x: 10, y: 10 };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      let path = URL.createObjectURL(files[0]);
      const img = new Image();
      img.onload = () => {
        const dimensions = { width: img.width, height: img.height };
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        path = canvas.toDataURL("image/jpeg");
        addImage(path, { x: coords.x, y: coords.y }, dimensions, presentation.currentSlide);
      };
      img.src = path;

    }
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

  function isText(item: TItem): item is TText {
    return (item as TText).content !== undefined;
  }

  function isShape(item: TItem): item is TShape {
    return (item as TShape).type !== undefined;
  }

  return (
    <div className={hidden ? [styles.sidebar, styles.hide].join(" ") : styles.sidebar}>
      {selectedItem && (
        <button className={styles.item} onClick={() => deleteItem(presentation.currentSlide)}>
          Удалить выбранный элемент
        </button>
      )}
      <button
        className={styles.item}
        onClick={() => addText("Text", { x: coords.x, y: coords.y }, presentation.currentSlide)}
      >
        Text
      </button>
      <button
        className={styles.item}
        onClick={() =>
          setSidebar(prev => ({
            ...prev,
            showPrimitives: !sidebar.showPrimitives,
          }))
        }
      >
        Primitives
      </button>
      <div className={[styles.container, !sidebar.showPrimitives && styles["container-hidden"]].join(" ")}>
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
      <button
        className={styles.item}
        onClick={() =>
          setSidebar(prev => ({
            ...prev,
            showImage: !sidebar.showImage,
          }))
        }
      >
        Image
      </button>
      <div className={[styles.container, !sidebar.showImage && styles["container-hidden"]].join(" ")}>
        <label className={styles.item}>
          <span>Choose an image</span>
          <input type="file" accept="image/*" onChange={handleImage} />
        </label>
      </div>
      <button
        className={styles.item}
        onClick={() =>
          setSidebar(prev => ({
            ...prev,
            showBack: !sidebar.showBack,
          }))
        }
      >
        Background
      </button>
      <div className={[styles.container, !sidebar.showBack && styles["container-hidden"]].join(" ")}>
        <label className={styles.item}>
          <span>Choose an image</span>
          <input type="file" accept="image/*" onChange={handleBackgroundImageChange}/>
        </label>
        <label className={styles.item}>
          <span>Color</span>
          <input type="color" value={typeof presentation.currentSlide.background === "string" ? presentation.currentSlide.background : "#ffffff"} onChange={handleBackgroundColorSlide}/>
        </label>
      </div>
      {selectedItem && isText(selectedItem) && (
          <div className={styles.container}>
            <label className={styles.item}>
              <span>Width</span>
              <input type="text"/>
            </label>
            <label className={styles.item}>
              <span>Height</span>
              <input type="text"/>
            </label>
          </div>
      )}
      {selectedItem && isShape(selectedItem) && (
          <div className={styles.container}>
            <label className={styles.item}>
              <span>Color</span>
              <input type="color" value={selectedItem.backgroundColor} onChange={handleBackgroundColorChange}/>
            </label>
            <label className={styles.item}>
              <span>Border Color</span>
              <input type="color" value={selectedItem.borderColor} onChange={handleBorderColorChange}/>
            </label>
          </div>
      )}

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
    addBackground: (path: string, slide: TSlide) => {
      dispatch({
        type: "ADD_BACKGROUND",
        payload: { path, slide },
      });
    },
    updateBackgroundColorSlide: (slide: TSlide, color: string) => {
      dispatch({
        type: "UPDATE_BACKGROUND_COLOR_SLIDE",
        payload: {slide, color},
      });
    },
    addImage: (path: string, location: TPosition, dimensions: { width: number; height: number }, slide: TSlide) => {
      dispatch({
        type: "ADD_IMAGE",
        payload: { path, location, dimensions, slide },
      });
    },
    deleteItem: (slide: TSlide) => {
      dispatch({
        type: "DELETE_ITEM",
        payload: { slide },
      });

    },
    updateBackgroundColor: (item: TShape | null, color: string) => {
      dispatch({
        type: "UPDATE_BACKGROUND_COLOR",
        payload: {item, color},
      });
    },
    updateBorderColor: (item: TShape | null, color: string) => {
      dispatch({
        type: "UPDATE_BORDER_COLOR",
        payload: {item, color},
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
