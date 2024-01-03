import { TPresentation, TSlide } from "../../types.ts";
import { uid } from "../../utils/uid.ts";

export function createSlide(presentation: TPresentation): TPresentation {
  const newSlide: TSlide = {
    selectedItem: null,
    id: uid(),
    background: "#fff",
    items: [],
  };

  return {
    ...presentation,
    slides: [...presentation.slides, newSlide],
    currentSlideId: newSlide.id,
  };
}

/* deleteSlide NEED FIX */
export function deleteSlide(presentation: TPresentation): TPresentation {
  presentation.slides = presentation.slides.filter(slide => slide.id !== presentation.currentSlideId);
  if (!presentation.slides.length) createSlide(presentation);
  presentation.currentSlideId = presentation.slides[0].id;

  return {
    ...presentation,
    slides: [...presentation.slides],
    currentSlideId: presentation.currentSlideId,
  };
}

export function selectSlide(presentation: TPresentation, slideId: string) {
  const currentSlideId = presentation.slides.find(slide => slide.id === slideId)?.id as string;
  return {
    ...presentation,
    slides: [...presentation.slides],
    currentSlideId: currentSlideId,
  };
}
