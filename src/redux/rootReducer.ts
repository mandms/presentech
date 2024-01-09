import { presentationReducer } from "./presentationReducer.ts";
import { TEditor, TPresentation, TSlide } from "../types.ts";
import { TAction } from "./actionType.ts";
import { store } from "./store.ts";
import { uid } from "../utils/uid.ts";
import { changePresentation, deletePresentation } from "./features/presentation.ts";

const initSlide: TSlide = {
  selectedItem: null,
  id: uid(),
  background: "#ffffff",
  items: [],
};

const initPresentation: TPresentation = {
  currentSlide: initSlide,
  name: "NEW",
  slides: [initSlide],
};

const initState: TEditor = {
  history: {
    actions: [initPresentation],
    actionNumber: 1,
  },
  presentation: initPresentation,
};

export const rootReducer = (state: TEditor = initState, action: TAction): TEditor => {
  switch (action.type) {
    case "CHANGE_PRESENTATION": {
      const { presentation } = action.payload;
      return changePresentation(presentation);
    }
    case "DELETE_PRESENTATION": {
      return deletePresentation();
    }
    default:
      return {
        history: { actions: [], actionNumber: 1 },
        presentation: presentationReducer(state.presentation, action),
      };
  }
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
