type TItem = {
  id: string;
  size: Size;
  location: TLocation;
};

type TLocation = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

type TChar = {
  id: number;
  fontFamily: string;
  fontSize: number;
  color: string;
  backgroundColor?: string;
  bold: boolean;
  italic: boolean;
  symbol: string;
};

type TText = TItem & {
  content: TChar[];
};

type IBackgroundImage = {
  path: string;
};

type TImage = TItem & IBackgroundImage;

enum ShapeType {
  Triangle,
  Circle,
  Square,
}

type TShape = TItem & {
  backgroundColor: string;
  borderColor: string;
  type: ShapeType;
};

type TSlide = {
  id: string;
  background: IBackgroundImage | string;
  items?: TItem[];
};

type TPresentation = {
  name: string;
  slides: TSlide[];
  currentSlideId: string;
};



type History = {
  actions: TPresentation[];
  actionNumber: number;
};

type TEditor = {
  history: History;
  presentation: TPresentation;
};

export { ShapeType };
export type { TItem, TText, TImage, TShape, TSlide, History, TPresentation, TChar, TEditor, TLocation };
