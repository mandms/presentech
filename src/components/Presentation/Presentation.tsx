import { TPresentation } from "../../types";
import Slide from "../Slide/Slide";
import styles from "./Presentation.module.css";

interface IPresentationProps {
  presentation: TPresentation;
  setCurrentSlideById: (id: number) => void;
}

function Presentation({ presentation, setCurrentSlideById }: IPresentationProps): JSX.Element {
  const currentSlide = presentation.slides[presentation.currentSlideId - 1];

  return (
    <div className={styles.container}>
      <ol className={styles.preview}>
        {presentation.slides.map(slide => (
          <li className={styles.wrap} key={slide.id}>
            <Slide setCurrentSlideById={id => setCurrentSlideById(id)} isPreview={true} slide={slide} />
          </li>
        ))}
      </ol>
      <div className={styles["container-current"]}>
        <Slide isPreview={false} key={currentSlide.id} slide={currentSlide} />
      </div>
    </div>
  );
}

export default Presentation;
