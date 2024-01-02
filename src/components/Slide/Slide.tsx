import { TSlide } from "../../types";
import Item from "../Items/Item";
import styles from "./Slide.module.css";
import useSlideResize from "../../hooks/useSlideResize.ts";
import { useRef } from "react";

interface ISlideProps {
  slide: TSlide;
  isPreview: boolean;
  setCurrentSlideById?: (id: string) => void;
}

function Slide({ slide, isPreview, setCurrentSlideById }: ISlideProps): JSX.Element {
  const slideRef = useRef<SVGSVGElement>(null);
  const { size, coefficient } = useSlideResize(slideRef, isPreview);

  return (
    <svg
      className={styles.slide}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0,0,${size.w},${size.h}`}
      fill="none"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      ref={slideRef}
      onClick={() => setCurrentSlideById && isPreview && setCurrentSlideById(slide.id)}
      id={!isPreview ? "current-slide" : `preview-slide-${slide.id}`}
    >
      {typeof slide.background !== "string" && <image className={styles.picture} xlinkHref={slide.background.path} />}

      <foreignObject x={0} y={0} width="100%" height="100%" style={{ position: "relative" }}>
        <div className={styles.container}>
          {slide.items?.map(item => (
            <Item coefficient={coefficient} item={item} key={item.id} isMovable={!isPreview} />
          ))}
        </div>
      </foreignObject>
    </svg>
  );
}

export default Slide;
