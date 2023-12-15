import { TSlide } from "../../types";
import Item from "../Items/Item";
import styles from "./Slide.module.css";

interface ISlideProps {
  slide: TSlide;
  isPreview: boolean;
  setCurrentSlideById?: (id: number) => void;
}

function Slide({ slide, isPreview, setCurrentSlideById }: ISlideProps): JSX.Element {
  //const previewClass = isPreview ? styles.preview : styles.slide;
  return (
    <svg
      className={styles.slide}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 560"
      fill="none"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      onClick={() => (setCurrentSlideById ? isPreview && setCurrentSlideById(slide.id) : null)}
    >
      {typeof slide.background !== "string" && <image className={styles.picture} xlinkHref={slide.background.path} />}

      <foreignObject x={0} y={0} width="100%" height="100%" style={{ position: "relative" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {slide.items?.map(item => <Item item={item} key={item.id} isMovable={!isPreview} />)}
        </div>
      </foreignObject>
    </svg>
  );
}

export default Slide;
