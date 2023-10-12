import { TSlide } from "../types";
import Item from "./Item";
import "./Slide.css";

interface ISlideProps {
  slide: TSlide;
}

function Slide(props: ISlideProps): JSX.Element {
  const slide = props.slide;
  return (
    <>
      <div
        className="slide"
        style={{
          background:
            typeof slide.background === "string" ? slide.background : `url(${slide.background.path}) no-repeat`,
          backgroundSize: "cover",
        }}
      >
        {slide.items?.map(item => <Item key={item.id} item={item} />)}
      </div>
    </>
  );
}

export default Slide;
