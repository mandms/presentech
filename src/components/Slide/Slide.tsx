import { TSlide } from "../../types";
import Item from "../Items/Item";
import styles from "./Slide.module.css";
import { MouseEvent, useEffect, useRef } from "react";

interface ISlideProps {
  slide: TSlide;
  isPreview: boolean;
}

function Slide({ slide }: ISlideProps): JSX.Element {
  //const previewClass = isPreview ? styles.preview : styles.slide;
  const itemRef = useRef<SVGGElement>(null);
  const slideRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!itemRef.current || !slideRef.current) return;
    const item = itemRef.current;
    const slide = slideRef.current;

    const onMouseDown = () => {
      //
    };

    const onMouseMove = (e: MouseEvent) => {
      item.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    item.addEventListener("mousedown", onMouseDown);
    slide.addEventListener("mousemove", e => onMouseMove(e as unknown as MouseEvent));
  }, []);

  return (
    <svg
      className={styles.slide}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 1001 563"
      fill="none"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      ref={slideRef}
    >
      {typeof slide.background !== "string" && <image className={styles.picture} xlinkHref={slide.background.path} />}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 0.5H1000.5V563H0.5V0.5ZM1.499 1.49823V562.002H999.501V1.49823H1.499Z"
        fill="#000"
      />
      {slide.items?.map(item => (
        <g ref={itemRef} key={item.id}>
          <Item item={item} />
        </g>
      ))}
    </svg>
  );
}

export default Slide;
