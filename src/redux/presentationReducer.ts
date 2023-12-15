import { TAction } from "./actionType.ts";
import { ShapeType, TLocation, TPresentation, TShape, TSlide } from "../types.ts";

function createSlide(presentation: TPresentation): TPresentation {
  presentation.slides.push(initSlide);
  return presentation;
}

function addPrimitive(
  presentation: TPresentation,
  shapeType: ShapeType,
  location: TLocation,
  slideId: number,
): TPresentation {
  let shape: TShape = {
    backgroundColor: "#fff",
    borderColor: "#000",
    id: "1",
    location,
    size: {
      width: 90,
      height: 90,
    },
    type: ShapeType.Square,
  };

  switch (shapeType) {
    case ShapeType.Circle:
      shape.type = ShapeType.Circle;
      break;
    case ShapeType.Triangle:
      shape.type = ShapeType.Triangle;
      break;
  }

  presentation.slides[slideId - 1].items?.push(shape); //поменять через find и норм id
  return presentation;
}

const initSlide: TSlide = {
  id: 1,
  background: "#fff",
  items: [],
};

const initState: TPresentation = {
  currentSlideId: initSlide.id,
  name: "",
  slides: [initSlide],
};

export const presentationReducer = (state: TPresentation = initState, action: TAction) => {
  switch (action.type) {
    case "CREATE_SLIDE":
      return createSlide(state);
    case "ADD_PRIMITIVE":
      const { shapeType, location, slideId } = action.payload;
      return addPrimitive(state, shapeType, location, slideId);
  }
  return state;
};
