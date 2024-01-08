import { TSlide } from "../types.ts";
import { TAction } from "./actionType.ts";
import {
  setBackgroundImageSlide,
  setBackgroundColorSlide,
  addImage,
  addPrimitive,
  addText,
  deleteItem,
  movingItems,
  setSelectedItem,
  updateBackgroundColor,
  updateBorderColor,
  setItemSize,
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
      return setBackgroundImageSlide(state, path, slide);
    }
    case "UPDATE_BACKGROUND_COLOR_SLIDE": {
      const { slide, color } = action.payload;
      return setBackgroundColorSlide(state, slide, color);
    }
    case "SELECT_ITEM": {
      const { item, slide } = action.payload;
      return setSelectedItem(state, slide, item);
    }
    case "DELETE_ITEM": {
      const { slide } = action.payload;
      return deleteItem(state, slide);
    }
    case "UPDATE_BACKGROUND_COLOR": {
      const { item, color } = action.payload;
      return updateBackgroundColor(state, item, color);
    }
    case "UPDATE_BORDER_COLOR": {
      const { item, color } = action.payload;
      return updateBorderColor(state, item, color);
    }
    case "SET_ITEM_SIZE": {
      const { item, size } = action.payload;
      return setItemSize(state, item, size);
    }
  }
  return state;
};
