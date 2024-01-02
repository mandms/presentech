import { TSlide } from "../types.ts";
import { TAction } from "./actionType.ts";
import { addBackground, addImage, addPrimitive, addText, movingItems, setSelectedItem } from "./features/slide.ts";

export const slideReducer = (state: TSlide[], action: TAction): TSlide[] => {
  switch (action.type) {
    case "MOVING_ITEMS": {
      const { slideId, itemId, position } = action.payload;
      return movingItems(state, slideId, itemId, position);
    }
    case "ADD_PRIMITIVE": {
      const { shapeType, location, slideId } = action.payload;
      return addPrimitive(state, shapeType, location, slideId);
    }
    case "ADD_TEXT": {
      const { text, location, slideId } = action.payload;
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
    case "SELECT_ITEM": {
      const { itemId, slideId } = action.payload;
      return setSelectedItem(state, slideId, itemId);
    }
  }
  return state;
};
