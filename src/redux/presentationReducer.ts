import { TAction } from "./actionType.ts";
import { ShapeType, TLocation, TPresentation, TShape, TSlide, TText, TChar, TImage } from "../types.ts";
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
    size: {
      width: 50,
      height: 20
    },
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

function addImage(presentation: TPresentation, path: string, location: TLocation, dimensions: { width:number, height:number }, slideId: string): TPresentation {
  const slide = presentation.slides.find(slide => slide.id === slideId);
  if (dimensions.width > 600 || dimensions.height > 600) {
    dimensions.width = dimensions.width - 400
    dimensions.height = dimensions.height - 400
  }
  const imageItems: TImage = {
    id: uid(),
    size: {
      width: dimensions.width,
      height: dimensions.height
    },
    location: { x: location.x, y: location.y },
    path: path,
  };


  slide?.items?.push(imageItems);
  return {
    ...presentation,
    slides: [...presentation.slides],
    currentSlideId: presentation.currentSlideId,
  };
}

function addBackground(presentation: TPresentation, path: string, slideId: string): TPresentation {
  const slide = presentation.slides.find(slide => slide.id === slideId);
  if (slide) {
    slide.background = { path: path };
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

function renamePresentation(presentation: TPresentation, name: string): TPresentation {
  const newPresentation: TPresentation = {
    ...presentation,
    name,
  };

  return newPresentation;
}

function openPresentation(data: TPresentation): TPresentation {
  const newPresentation: TPresentation = {
    ...data,
  };

  return newPresentation;
}
export const presentationReducer = (state: TPresentation = initState, action: TAction) => {
  switch (action.type) {
    case "RENAME_PRESENTATION": {
      return renamePresentation(state, action.payload);
    }
    case "OPEN_PRESENTATION": {
      return openPresentation(action.payload);
    }
    case "CREATE_SLIDE":
      return createSlide(state);
    case "DELETE_SLIDE":
      return deleteSlide(state);
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
    case "ADD_IMAGE": {
      const { path, location, dimensions, slideId } = action.payload;
      return addImage(state, path, location, dimensions, slideId);
    }
    case "ADD_BACKGROUND": {
      const { path, slideId } = action.payload;
      return addBackground(state, path, slideId);
    }
    default:
      return { ...state };
  }
};
