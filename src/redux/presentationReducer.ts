import { TAction } from "./actionType.ts";
import { ShapeType, TLocation, TPresentation, TShape, TSlide } from "../types.ts";
import { uid } from "../utils/uid.ts";

function createSlide(presentation: TPresentation): TPresentation {
  const newSlide: TSlide = {
    id: uid(),
    background: "#fff",
    items: [],
  };

  return {
    ...presentation,
    slides: [...presentation.slides, newSlide],
    currentSlideId: newSlide.id,
  };
}

function deleteSlide(presentation: TPresentation): TPresentation {
  const { slides } = presentation;
  const currentId = presentation.currentSlideId;

  const newSlideList = slides.filter((slide) => slide.id !== currentId);

  const newSelectedSlideId = newSlideList.length > 0 ? newSlideList[newSlideList.length - 1].id : null;

  console.log(currentId);
  //console.log(newSlideList);

  const newPresentation: TPresentation = {
    ...presentation,
    slides: newSlideList,
    currentSlideId: newSelectedSlideId !== null ? newSelectedSlideId : '1',
  };

  return newPresentation;
}

function addPrimitive(
  presentation: TPresentation,
  shapeType: ShapeType,
  location: TLocation,
  slideId: string,
): TPresentation {
  let shape: TShape = {
    backgroundColor: "#fff",
    borderColor: "#000",
    id: uid(),
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
  const slide = presentation.slides.find(slide => slide.id === slideId);
  slide?.items?.push(shape);
  return {
    ...presentation,
    slides: [...presentation.slides],
    currentSlideId: presentation.currentSlideId,
  };
}

function selectSlide(presentation: TPresentation, slideId: string) {
  const currentSlideId = presentation.slides.find(slide => slide.id === slideId)?.id as string;
  return {
    ...presentation,
    slides: [...presentation.slides],
    currentSlideId: currentSlideId,
  };
}

const initSlide: TSlide = {
  id: uid(),
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
    case "DELETE_SLIDE":
      return deleteSlide(state, state.currentSlideId);
    case "SELECT_SLIDE": {
      const { slideId } = action.payload;
      return selectSlide(state, slideId);
    }
    case "ADD_PRIMITIVE": {
      const { shapeType, location, slideId } = action.payload;
      return addPrimitive(state, shapeType, location, slideId);
    }
    default:
      return { ...state };
  }
};
