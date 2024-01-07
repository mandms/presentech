import { TEditor, TPresentation, TSlide } from "../../types.ts";
import { uid } from "../../utils/uid.ts";

export function createSlide(presentation: TPresentation): TPresentation {
  const newSlide: TSlide = {
    selectedItem: null,
    id: uid(),
    background: "#ffffff",
    items: [],
  };

  return {
    ...presentation,
    slides: [...presentation.slides, newSlide],
    currentSlide: newSlide,
  };
}

export function deleteSlide(presentation: TPresentation): TPresentation {
  presentation.slides = presentation.slides.filter(slide => slide !== presentation.currentSlide);
  if (!presentation.slides.length) return createSlide(presentation);
  presentation.currentSlide = presentation.slides[0];

  return {
    ...presentation,
    slides: [...presentation.slides],
    currentSlide: presentation.currentSlide,
  };
}

export function selectSlide(presentation: TPresentation, slide: TSlide) {
  return {
    ...presentation,
    slides: [...presentation.slides],
    currentSlide: slide,
  };
}

export function changePresentation(presentation: TPresentation): TEditor {
  presentation.currentSlide = presentation.slides[0];
  return {
    history: {
      actions: [presentation],
      actionNumber: 1,
    },
    presentation: presentation,
  };
}
