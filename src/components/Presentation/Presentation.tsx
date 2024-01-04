import { TPresentation, TSlide } from "../../types";
import Slide from "../Slide/Slide";
import styles from "./Presentation.module.css";
import SideBar from "./SideBar/SideBar.tsx";
import { AppDispatch, RootState } from "../../redux/rootReducer.ts";
import { connect } from "react-redux";

interface IPresentationProps {
  presentation: TPresentation;
  setCurrentSlideById: (id: string) => void;
}

function Presentation({ presentation, setCurrentSlideById }: IPresentationProps): JSX.Element {
  const currentSlide = presentation.slides.find(slide => slide.id === presentation.currentSlideId) as TSlide;

  return (
      <div className={styles.container}>
          <div className={styles.preview}>
              <ol>
                  {presentation.slides.map((slide, i) => (
                      <li
                          className={`${styles.wrap} ${presentation.currentSlideId === slide.id ? styles.active : ''}`}
                          key={slide.id}
                      >
                          <Slide setCurrentSlideById={id => setCurrentSlideById(id)} isPreview={true} slide={slide}/>
                      </li>
                  ))}
              </ol>
          </div>
          <div className={styles["container-current"]}>
              <Slide isPreview={false} key={currentSlide.id} slide={currentSlide}/>
          </div>
          <SideBar/>
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
        setCurrentSlideById: (id: string) => {
            dispatch({
                type: "SELECT_SLIDE",
                payload: {slideId: id},
            });
        },

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
