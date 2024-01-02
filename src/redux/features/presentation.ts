import { TPresentation, TSlide } from "../../types.ts";
import { uid } from "../../utils/uid.ts";

export function createSlide(presentation: TPresentation): TPresentation {
  const newSlide: TSlide = {
    selectedItem: undefined,
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

export function selectSlide(presentation: TPresentation, slideId: string) {
  const currentSlideId = presentation.slides.find(slide => slide.id === slideId)?.id as string;
  return {
    ...presentation,
    slides: [...presentation.slides],
    currentSlideId: currentSlideId,
  };
}
