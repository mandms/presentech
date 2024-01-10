import { TItem, TPosition, TSlide } from "../../types";
import Item from "../Items/Item/Item.tsx";
import styles from "./Slide.module.css";
import useSlideResize from "../../hooks/useSlideResize.ts";
import { useRef, MouseEvent } from "react";
import { AppDispatch } from "../../redux/rootReducer.ts";
import { connect } from "react-redux";

interface ISlideProps {
  slide: TSlide;
  isPreview: boolean;
  isCurrent?: boolean;
  setCurrentSlide?: (slide: TSlide) => void;
  selectItem: (slide: TSlide, item: TItem | null) => void;
  onMove: (item: TItem, position: TPosition) => void;
}

function Slide({ slide, isPreview, setCurrentSlide, selectItem, onMove, isCurrent }: ISlideProps): JSX.Element {
  const slideRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { size, coefficient } = useSlideResize(slideRef, isPreview);
  const onSlideClick = (e: MouseEvent) => {
    if (setCurrentSlide && isPreview) setCurrentSlide(slide);
    if (!isPreview) {
      const container = containerRef.current;
      if (e.target === container) {
        selectItem(slide, null);
      }
    }
  };

  const setId = !isPreview ? "current-slide" : `preview-slide-${slide.id}`;

  return (
    <svg
      className={isCurrent ? [styles.current, styles.slide].join(" ") : styles.slide}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0,0,${size.w},${size.h}`}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      ref={slideRef}
      onClick={e => onSlideClick(e)}
      id={setId}
    >
      {typeof slide.background !== "string" && (
        <image className={styles.picture} xlinkHref={slide.background.path} style={{ position: "absolute" }} />
      )}
      {slide.items && (
        <foreignObject className={styles.wrapper} x={0} y={0}>
          <div
            ref={containerRef}
            className={styles.container}
            style={{ backgroundColor: typeof slide.background === "string" ? slide.background : "transparent" }}
          >
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
