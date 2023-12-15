import { presentationReducer } from "./presentationReducer.ts";
import { TEditor, TPresentation, TSlide } from "../types.ts";
import { TAction } from "./actionType.ts";
import { store } from "./store.ts";

const initSlide: TSlide = {
  id: 1,
  background: "#fff",
  items: [],
};

const initPresentation: TPresentation = {
  currentSlideId: initSlide.id,
  name: "Презентация без названия",
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
    default:
      return {
        history: { actions: [], actionNumber: 1 },
        presentation: presentationReducer(state.presentation, action),
      };
  }
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
