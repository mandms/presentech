import { TSlide } from "../../types";
import Item from "../Items/Item";
import styles from "./Slide.module.css";

interface ISlideProps {
  slide: TSlide;
  isPreview: boolean;
}

function Slide({ slide }: ISlideProps): JSX.Element {
  //const previewClass = isPreview ? styles.preview : styles.slide;
  return (
    <svg
      className={styles.slide}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 1001 563"
      fill="none"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {typeof slide.background !== "string" && <image className={styles.picture} xlinkHref={slide.background.path} />}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 0.5H1000.5V563H0.5V0.5ZM1.499 1.49823V562.002H999.501V1.49823H1.499Z"
        fill="#000"
      />

      {slide.items?.map(item => <Item key={item.id} item={item} />)}
    </svg>
  );
}

export default Slide;
