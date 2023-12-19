import styles from "./SideBar.module.css";
import { useContext, useState } from "react";
import { ShapeType, TLocation, TPresentation } from "../../../types.ts";
import { AppDispatch, RootState } from "../../../redux/rootReducer.ts";
import { connect } from "react-redux";
import { CollapseToolBarContext } from "../../../context/collapseToolBar.ts";
import useChoose from "../../../hooks/useChoose.ts";

type SideBarProps = {
  presentation: TPresentation;
  addPrimitive: (shapeType: ShapeType, location: TLocation, slideId: string) => void;
};
function SideBar({ presentation, addPrimitive }: SideBarProps): JSX.Element {
  const [showPrimitives, setShowPrimitives] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const { hidden } = useContext(CollapseToolBarContext);

  const coords = useChoose();
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
      <button className={styles.item}>Font</button>
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
      <button className={styles.item} onClick={() => setShowBack(!showBack)}>
        Background
      </button>
      <div className={[styles.container, !showBack && styles["container-hidden"]].join(" ")}>
        <input className={styles["hex-input"]} type="text" defaultValue="#..." />
        <label className={styles.item}>
          <span>Выберите картинку</span>
          <input type="file" accept="image/*" />
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
    addPrimitive: (shapeType: ShapeType, location: TLocation, slideId: string) => {
      dispatch({
        type: "ADD_PRIMITIVE",
        payload: { shapeType, location, slideId },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
