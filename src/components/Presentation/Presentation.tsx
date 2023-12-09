import { TPresentation } from "../../types";
import Slide from "../Slide/Slide";
import styles from "./Presentation.module.css";

interface IPresentationProps {
  presentation: TPresentation;
}

function Presentation(props: IPresentationProps): JSX.Element {
  const presentation = props.presentation;
  const currentSlide = presentation.slides[presentation.currentSlideId];
  return (
    <div className={styles.container}>
      <ol className={styles.preview}>
        {presentation.slides.map(slide => (
          <div className={styles.wrap} key={slide.id}>
              <div className={styles.miniSlide}>
                  <span>{slide.id + 1}</span>
                  <Slide isPreview={true} slide={slide} />
              </div>
          </div>
        ))}
      </ol>
      <div className={styles["container-current"]}>
        <svg
          className={styles.slide}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 1001 563"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.5 0.5H1000.5V563H0.5V0.5ZM1.499 1.49823V562.002H999.501V1.49823H1.499Z"
            fill="#000"
          />
          <Slide isPreview={false} key={currentSlide.id} slide={currentSlide} />
        </svg>
      </div>
    </div>
  );
}

export default Presentation;
