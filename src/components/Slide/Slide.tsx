import { TItem, TPosition, TSlide } from "../../types";
import Item from "../Items/Item";
import styles from "./Slide.module.css";
import useSlideResize from "../../hooks/useSlideResize.ts";
import { useRef } from "react";
import { AppDispatch } from "../../redux/rootReducer.ts";
import { connect } from "react-redux";

interface ISlideProps {
  slide: TSlide;
  isPreview: boolean;
  isCurrent?: boolean;
  setCurrentSlideById?: (slide: TSlide) => void;
  selectItem: (slide: TSlide, item: TItem | null) => void;
  onMove: (item: TItem, position: TPosition) => void;
}

function Slide({ slide, isPreview, setCurrentSlideById, selectItem, onMove, isCurrent }: ISlideProps): JSX.Element {
  const slideRef = useRef<SVGSVGElement>(null);
  const { size, coefficient } = useSlideResize(slideRef, isPreview);

  return (
    <svg
      className={isCurrent ? [styles.current, styles.slide].join(" ") : styles.slide}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0,0,${size.w},${size.h}`}
      fill="none"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      ref={slideRef}
      onClick={e => {
        if (setCurrentSlideById && isPreview) setCurrentSlideById(slide);
        if (!isPreview) {
          const container = slideRef?.current?.children[typeof slide.background === "string" ? 0 : 1].children[0];
          if (e.target === container) selectItem(slide, null);
        }
      }}
      id={!isPreview ? "current-slide" : `preview-slide-${slide.id}`}
    >
      {typeof slide.background !== "string" && <image className={styles.picture} xlinkHref={slide.background.path} />}
      {slide.items && (
        <foreignObject x={0} y={0} width="100%" height="100%" style={{ position: "relative" }}>
          <div className={styles.container}>
            {slide.items.map(item => (
              <Item
                onMove={position => onMove(item, position)}
                isSelected={slide.selectedItem === item}
                selectItem={() => selectItem(slide, item)}
                coefficient={coefficient}
                item={item}
                isMovable={!isPreview}
                key={item.id}
              />
            ))}
          </div>
        </foreignObject>
      )}
    </svg>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    selectItem: (slide: TSlide, item: TItem | null) => {
      dispatch({
        type: "SELECT_ITEM",
        payload: { slide, item },
      });
    },
    onMove: (item: TItem, position: TPosition) => {
      dispatch({
        type: "MOVING_ITEMS",
        payload: { item, position },
      });
    },
  };
};
export default connect(null, mapDispatchToProps)(Slide);
