import { TAction } from "./actionType.ts";
import { TPresentation, TSlide } from "../types.ts";
import { uid } from "../utils/uid.ts";
import { slideReducer } from "./slideReducer.ts";
import { createSlide, selectSlide } from "./features/presentation.ts";

const initSlide: TSlide = {
  selectedItemId: null,
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

    default:
      return {
        ...state,
        slides: slideReducer(state.slides, action),
      };
  }
};
