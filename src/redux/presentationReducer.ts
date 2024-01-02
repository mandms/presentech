import { TAction } from "./actionType.ts";
import { ShapeType, TLocation, TPresentation, TShape, TSlide, TText, TChar } from "../types.ts";
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

function addPrimitive(
  presentation: TPresentation,
  shapeType: ShapeType,
  location: TLocation,
  slideId: string,
): TPresentation {
  const typeShape = () => {
    switch (shapeType) {
      case ShapeType.Circle:
        return ShapeType.Circle;
      case ShapeType.Triangle:
        return ShapeType.Triangle;
      case ShapeType.Square:
        return ShapeType.Square;
    }
  };

  const shape: TShape = {
    backgroundColor: "#fff",
    borderColor: "#000",
    id: uid(),
    location: location,
    size: {
      width: 90,
      height: 90,
    },
    type: typeShape(),
  };

  const slide = presentation.slides.find(slide => slide.id === slideId);
  slide?.items?.push(shape);
  return {
    ...presentation,
    slides: [...presentation.slides],
    currentSlideId: presentation.currentSlideId,
  };
}

function addText(presentation: TPresentation, text: string, location: TLocation, slideId: string): TPresentation {
  const slide = presentation.slides.find(slide => slide.id === slideId);
  const textItems: TText = {
    id: uid(),
    size: { width: 50, height: 20 },
    location: { x: location.x, y: location.y },
    content: [],
  };

  for (let i = 0; i < text.length; i++) {
    const char: TChar = {
      id: i,
      fontFamily: "Arial",
      fontSize: 24,
      color: "black",
      bold: false,
      italic: false,
      symbol: text[i],
    };
    textItems.content.push(char);
  }

  slide?.items?.push(textItems);
  return {
    ...presentation,
    slides: [...presentation.slides],
    currentSlideId: presentation.currentSlideId,
  };
}

function addBackground(presentation: TPresentation, imageUrl: string, slideId: string): TPresentation {
  const slide = presentation.slides.find(slide => slide.id === slideId);
  if (slide) {
    if (typeof slide.background === "string") {
      slide.background = { path: imageUrl };
    } else {
      slide.background.path = imageUrl;
    }
  }
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
    case "SELECT_SLIDE": {
      const { slideId } = action.payload;
      return selectSlide(state, slideId);
    }
    case "ADD_PRIMITIVE": {
      const { shapeType, location, slideId } = action.payload;
      return addPrimitive(state, shapeType, location, slideId);
    }
    case "ADD_TEXT": {
      const { text,location, slideId } = action.payload;
      return addText(state, text, location, slideId);
    }
    case "ADD_BACKGROUND": {
      const { imageUrl, slideId } = action.payload;
      return addBackground(state, imageUrl, slideId);
    }
    default:
      return { ...state };
  }
};
