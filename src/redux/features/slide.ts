import {ShapeType, TChar, TImage, TPosition, TShape, TSlide, TText} from "../../types.ts";
import {uid} from "../../utils/uid.ts";

export function movingItems(slides: TSlide[], slideId: string, itemId: string, position: TPosition): TSlide[] {
  const slide = slides.find(slide => slide.id === slideId);
  if (!slide) return [...slides]
  const item = slide.items?.find(item => item.id == itemId)
  if (!item) return [...slides]
  item.location = position
  return [...slides]
}

export function addPrimitive(
  slides: TSlide[],
  shapeType: ShapeType,
  location: TPosition,
  slideId: string,
): TSlide[] {
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

  const slide = slides.find(slide => slide.id === slideId);
  slide?.items?.push(shape);
  return [...slides];
}

export function addText(slides: TSlide[], text: string, location: TPosition, slideId: string): TSlide[] {
  const slide = slides.find(slide => slide.id === slideId);
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
  return [...slides];
}

export function addImage(slides: TSlide[], path: string, location: TPosition, dimensions: { width:number, height:number }, slideId: string): TSlide[] {
  const slide = slides.find(slide => slide.id === slideId);
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
  return [...slides];
}

export function addBackground(slides: TSlide[], path: string, slideId: string): TSlide[] {
  const slide = slides.find(slide => slide.id === slideId);
  if (slide) {
    slide.background = { path: path };
  }
  return [...slides];
}