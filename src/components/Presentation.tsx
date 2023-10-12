import { TPresentation } from "../types";
import Slide from "./Slide";

interface IPresentationProps {
  presentation: TPresentation;
}

function Presentation(props: IPresentationProps): JSX.Element {
  const presentation = props.presentation;
  return (
    <>
      <div>
        <h2>{presentation.name}</h2>
        {presentation.slides.map(slide => (
          <Slide key={slide.id} slide={slide} />
        ))}
      </div>
    </>
  );
}

export default Presentation;
