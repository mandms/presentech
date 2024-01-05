import { TPresentation, TSlide } from "../../types";
import Slide from "../Slide/Slide";
import styles from "./Presentation.module.css";
import SideBar from "./SideBar/SideBar.tsx";
import { AppDispatch, RootState } from "../../redux/rootReducer.ts";
import { connect } from "react-redux";

interface IPresentationProps {
  presentation: TPresentation;
  setCurrentSlideById: (slide: TSlide) => void;
}

function Presentation({ presentation, setCurrentSlideById }: IPresentationProps): JSX.Element {
  return (
    <div className={styles.container}>
      <ol className={styles.preview}>
        {presentation.slides.map(slide => (
          <li className={styles.wrap} key={slide.id}>
            <Slide
              isCurrent={presentation.currentSlide === slide}
              setCurrentSlideById={slide => setCurrentSlideById(slide)}
              isPreview={true}
              slide={slide}
            />
          </li>
        ))}
      </ol>
      <div className={styles["container-current"]}>
        <Slide isPreview={false} key={presentation.currentSlide.id} slide={presentation.currentSlide} />
      </div>
      <SideBar />
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
    setCurrentSlideById: (slide: TSlide) => {
      dispatch({
        type: "SELECT_SLIDE",
        payload: { slide },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
