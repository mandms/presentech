import { TAction } from "./actionType.ts";
import { TPresentation, TSlide } from "../types.ts";
import { uid } from "../utils/uid.ts";
import { slideReducer } from "./slideReducer.ts";
import { createSlide, deleteSlide, selectSlide } from "./features/presentation.ts";

const initSlide: TSlide = {
  selectedItem: null,
  id: uid(),
  background: "#fff",
  items: [],
};

const initState: TPresentation = {
  currentSlideId: initSlide.id,
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
      const { slideId } = action.payload;
      return selectSlide(state, slideId);
    }
    case "IMPORT_PRESENTATION":
      return { ...state };
    default:
      return {
        ...state,
        slides: slideReducer(state.slides, action),
      };
  }
};
