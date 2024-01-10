import styles from "./SideBar.module.css";
import React, { useContext, useState } from "react";
import { TItem, TPresentation, TShape, TSlide, TText } from "../../../types.ts";
import { AppDispatch, RootState } from "../../../redux/rootReducer.ts";
import { connect } from "react-redux";
import { CollapseSideBarContext } from "../../../context/collapseToolBar.ts";
import { toBase64 } from "../../../utils/image.ts";

type SideBarProps = {
  presentation: TPresentation;
  setBackgroundImageSlide: (path: string, slide: TSlide) => void;
  setBackgroundColorSlide: (slide: TSlide, color: string) => void;
  deleteItem: (slide: TSlide) => void;
  setBackgroundColor: (item: TShape | null, color: string) => void;
  setBorderColor: (item: TShape | null, color: string) => void;
  setTextColor: (item: TText | null, color: string) => void;
  setFontFamily: (item: TText | null, fontFamily: string) => void;
  setFontSize: (item: TText | null, fontSize: number) => void;
  setTextBold: (item: TText | null) => void;
  setTextItalic: (item: TText | null) => void;
};

function SideBar({
  presentation,
  setBackgroundImageSlide,
  setBackgroundColorSlide,
  deleteItem,
  setBackgroundColor,
  setBorderColor,
  setTextColor,
  setFontFamily,
  setFontSize,
  setTextBold,
  setTextItalic,
}: SideBarProps): JSX.Element {
  const selectedItem = presentation.currentSlide.selectedItem;
  const { hidden } = useContext(CollapseSideBarContext);
  const [sidebar, setSidebar] = useState({
    showBack: false,
  });

  const handleBackgroundImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const base64 = await toBase64(files[0]);
      const img = new Image();
      img.src = URL.createObjectURL(files[0]);
      setBackgroundImageSlide(base64, presentation.currentSlide);
    }
    event.target.value = "";
  };

  const handleBackgroundColorSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setBackgroundColorSlide(presentation.currentSlide, color);
  };

  const handleBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setBackgroundColor(selectedItem as TShape, color);
  };
  const handleBorderColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setBorderColor(selectedItem as TShape, color);
  };

  const handleTextColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setTextColor(selectedItem as TText, color);
  };
  const handleFontFamily = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fontFamily = event.target.value;
    setFontFamily(selectedItem as TText, fontFamily);
  };
  const handleFontSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fontSize = +event.target.value;
    setFontSize(selectedItem as TText, fontSize);
  };
  const handleTextBold = () => {
    setTextBold(selectedItem as TText);
  };
  const handleTextItalic = () => {
    setTextItalic(selectedItem as TText);
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
          <input type="file" accept="image/*" onChange={handleBackgroundImageChange} />
        </label>
        <label className={styles.item}>
          <span>Color</span>
          <input
            type="color"
            value={
              typeof presentation.currentSlide.background === "string"
                ? presentation.currentSlide.background
                : "#ffffff"
            }
            onChange={handleBackgroundColorSlide}
          />
        </label>
      </div>
      {selectedItem && isText(selectedItem) && (
        <div className={styles.container}>
          <label className={styles["item-text"]}>
            <select value={selectedItem.fontFamily} className={styles["select-custom"]} onChange={handleFontFamily}>
              <option value="Arial" style={{ fontFamily: "Arial" }}>
                Arial
              </option>
              <option value="Times New Roman" style={{ fontFamily: "Times New Roman" }}>
                Times New Roman
              </option>
              <option value="Courier New" style={{ fontFamily: "Courier New" }}>
                Courier New
              </option>
              <option value="Verdana" style={{ fontFamily: "Verdana" }}>
                Verdana
              </option>
              <option value="Brush Script MT" style={{ fontFamily: "Brush Script MT" }}>
                Brush Script MT
              </option>
            </select>
            <input
              type="number"
              value={selectedItem.fontSize}
              className={styles["number-input"]}
              onChange={handleFontSize}
            />
          </label>
          <label className={styles.item}>
            Bold
            <input type="checkbox" checked={selectedItem.bold} onChange={handleTextBold} />
          </label>
          <label className={styles.item}>
            Italic
            <input type="checkbox" checked={selectedItem.italic} onChange={handleTextItalic} />
          </label>
          <label className={styles.item}>
            <span>Color</span>
            <input type="color" value={selectedItem.color} onChange={handleTextColor} />
          </label>
        </div>
      )}
      {selectedItem && isShape(selectedItem) && (
        <div className={styles.container}>
          <label className={styles.item}>
            <span>Color</span>
            <input type="color" value={selectedItem.backgroundColor} onChange={handleBackgroundColorChange} />
          </label>
          <label className={styles.item}>
            <span>Border Color</span>
            <input type="color" value={selectedItem.borderColor} onChange={handleBorderColorChange} />
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
    setBackgroundImageSlide: (path: string, slide: TSlide) => {
      dispatch({
        type: "ADD_BACKGROUND",
        payload: { path, slide },
      });
    },
    setBackgroundColorSlide: (slide: TSlide, color: string) => {
      dispatch({
        type: "SET_BACKGROUND_COLOR_SLIDE",
        payload: { slide, color },
      });
    },
    deleteItem: (slide: TSlide) => {
      dispatch({
        type: "DELETE_ITEM",
        payload: { slide },
      });
    },
    setBackgroundColor: (item: TShape | null, color: string) => {
      dispatch({
        type: "SET_BACKGROUND_COLOR_ITEM",
        payload: { item, color },
      });
    },
    setBorderColor: (item: TShape | null, color: string) => {
      dispatch({
        type: "SET_BORDER_COLOR_ITEM",
        payload: { item, color },
      });
    },
    setTextColor: (item: TText | null, color: string) => {
      dispatch({
        type: "SET_TEXT_COLOR",
        payload: { item, color },
      });
    },
    setFontFamily: (item: TText | null, fontFamily: string) => {
      dispatch({
        type: "SET_FONT_FAMILY",
        payload: { item, fontFamily },
      });
    },
    setFontSize: (item: TText | null, fontSize: number) => {
      dispatch({
        type: "SET_FONT_SIZE",
        payload: { item, fontSize },
      });
    },
    setTextBold: (item: TText | null) => {
      dispatch({
        type: "SET_TEXT_BOLD",
        payload: { item },
      });
    },
    setTextItalic: (item: TText | null) => {
      dispatch({
        type: "SET_TEXT_ITALIC",
        payload: { item },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
