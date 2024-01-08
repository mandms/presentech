import { TAction } from "./actionType.ts";
import { TPresentation, TSlide } from "../types.ts";
import { uid } from "../utils/uid.ts";
import { slideReducer } from "./slideReducer.ts";
import {
  createSlide,
  deleteSlide,
  selectSlide,
  renamePresentation,
} from "./features/presentation.ts";

const initSlide: TSlide = {
  selectedItem: null,
  id: uid(),
  background: "#ffffff",
  items: [],
};

const initState: TPresentation = {
  currentSlide: initSlide,
  name: "",
  slides: [initSlide],
};

export const presentationReducer = (state: TPresentation = initState, action: TAction): TPresentation => {
  switch (action.type) {
    case "CREATE_SLIDE":
      return createSlide(state);
    case "DELETE_SLIDE":
      return deleteSlide(state);
    case "SELECT_SLIDE": {
      const { slide } = action.payload;
      return selectSlide(state, slide);
    }
    case "RENAME_PRESENTATION": {
      return renamePresentation(state, action.payload);
    }
    default:
      return {
        ...state,
        slides: slideReducer(state.slides, action),
      };
  }
};
