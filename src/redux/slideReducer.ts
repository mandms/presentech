import { TSlide } from "../types.ts";
import { TAction } from "./actionType.ts";
import {
  addBackground,
  addImage,
  addPrimitive,
  addText,
  deleteItem,
  movingItems,
  setSelectedItem,
} from "./features/slide.ts";

export const slideReducer = (state: TSlide[], action: TAction): TSlide[] => {
  switch (action.type) {
    case "MOVING_ITEMS": {
      const { item, position } = action.payload;
      return movingItems(state, item, position);
    }
    case "ADD_PRIMITIVE": {
      const { shapeType, location, slide } = action.payload;
      return addPrimitive(state, shapeType, location, slide);
    }
    case "ADD_TEXT": {
      const { text, location, slide } = action.payload;
      return addText(state, text, location, slide);
    }
    case "ADD_IMAGE": {
      const { path, location, dimensions, slide } = action.payload;
      return addImage(state, path, location, dimensions, slide);
    }
    case "ADD_BACKGROUND": {
      const { path, slide } = action.payload;
      return addBackground(state, path, slide);
    }
    case "SELECT_ITEM": {
      const { item, slide } = action.payload;
      return setSelectedItem(state, slide, item);
    }
    case "DELETE_ITEM": {
      const { slide } = action.payload;
      return deleteItem(state, slide);
    }
  }
  return state;
};
