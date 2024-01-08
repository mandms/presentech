import { presentationReducer } from "./presentationReducer.ts";
import { TEditor, TPresentation, TSlide } from "../types.ts";
import { TAction } from "./actionType.ts";
import { store } from "./store.ts";
import { uid } from "../utils/uid.ts";
import {openPresentation} from "./features/presentation.ts";

const initSlide: TSlide = {
  selectedItem: null,
  id: uid(),
  background: "#ffffff",
  items: [],
};

const initPresentation: TPresentation = {
  currentSlide: initSlide,
  name: "New",
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
    case "OPEN_PRESENTATION": {
      return openPresentation(action.payload);
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
