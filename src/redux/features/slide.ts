import { ShapeType, TChar, TImage, TItem, TPosition, TShape, TSlide, TText } from "../../types.ts";
import { uid } from "../../utils/uid.ts";

export function movingItems(slides: TSlide[], item: TItem, position: TPosition): TSlide[] {
  item.location = position;
  return [...slides];
}

export function addPrimitive(slides: TSlide[], shapeType: ShapeType, location: TPosition, slide: TSlide): TSlide[] {
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

  slide.items?.push(shape);
  return [...slides];
}

export function addText(slides: TSlide[], text: string, location: TPosition, slide: TSlide): TSlide[] {
  const textItems: TText = {
    id: uid(),
    size: {
      width: 200,
      height: 100,
    },
    location: { x: location.x, y: location.y },
    content: [],
  };

  for (let i = 0; i < text.length; i++) {
    const char: TChar = {
      id: uid(),
      fontFamily: "Arial",
      fontSize: 24,
      color: "black",
      bold: false,
      italic: false,
      symbol: text[i],
    };
    textItems.content.push(char);
  }

  slide.items?.push(textItems);
  return [...slides];
}

export function addImage(
  slides: TSlide[],
  path: string,
  location: TPosition,
  dimensions: { width: number; height: number },
  slide: TSlide,
): TSlide[] {
  if (dimensions.width > 600 || dimensions.height > 600) {
    dimensions.width = dimensions.width - 400;
    dimensions.height = dimensions.height - 400;
  }

  const imageItems: TImage = {
    id: uid(),
    size: {
      width: dimensions.width,
      height: dimensions.height,
    },
    location: { x: location.x, y: location.y },
    path: path,
  };

  slide.items?.push(imageItems);
  return [...slides];
}

export function addBackground(slides: TSlide[], path: string, slide: TSlide): TSlide[] {
  slide.background = { path: path };
  return [...slides];
}

export function setSelectedItem(slides: TSlide[], slide: TSlide, item: TItem | null) {
  if (!item) {
    slide.selectedItem = null;
    return [...slides];
  }

  if (item !== slide.selectedItem) {
    slide.selectedItem = item;
  }

  return [...slides];
}

export function deleteItem(slides: TSlide[], slide: TSlide) {
  const currentSlide = slides.find(value => value === slide);
  if (currentSlide && currentSlide.items) {
    currentSlide.items = currentSlide.items.filter(item => item !== slide.selectedItem);
    currentSlide.selectedItem = null;
  }

  return [...slides];
}

export function updateBackgroundColor(slides: TSlide[], item: TShape, color: string) {
  if(!item) return [...slides];
  item.backgroundColor = color;

  return [...slides];
}

export function updateBorderColor(slides: TSlide[], item: TShape, color: string) {
  if(!item) return [...slides];
  item.borderColor = color;

  return [...slides];
}
