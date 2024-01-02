import { TChar, TEditor, History, TImage, TPresentation, ShapeType, TSlide, TText, TShape } from "../types";
import { uid } from "../utils/uid.ts";

const shapeCircle: TShape = {
  backgroundColor: "#fff",
  borderColor: "#000",
  id: "1",
  location: {
    x: 100,
    y: 100,
  },
  size: {
    width: 120,
    height: 120,
  },
  type: ShapeType.Circle,
};

const shapeTriangle: TShape = {
  backgroundColor: "#ff6700",
  borderColor: "#774177",
  id: "2",
  location: {
    x: 0,
    y: 0,
  },
  size: {
    width: 120,
    height: 120,
  },
  type: ShapeType.Triangle,
};

const shapeSquare: TShape = {
  backgroundColor: "#fff",
  borderColor: "#000",
  id: "3",
  location: {
    x: 20,
    y: 50,
  },
  size: {
    width: 400,
    height: 50,
  },
  type: ShapeType.Square,
};

const img: TImage = {
  id: "4",
  path: "./logo192.png",
  size: {
    width: 100,
    height: 100,
  },
  location: {
    x: 400,
    y: 350,
  },
};

const charA: TChar = {
  id: 1,
  bold: false,
  symbol: "A",
  color: "#000",
  fontSize: 0,
  fontFamily: "sans-serif",
  italic: true,
};

const charB: TChar = {
  id: 2,
  bold: true,
  symbol: "B",
  color: "#000",
  fontSize: 0,
  fontFamily: "sans-serif",
  italic: false,
};

const charC: TChar = {
  id: 3,
  bold: true,
  symbol: "C",
  color: "#ff0000",
  fontSize: 0,
  fontFamily: "sans-serif",
  italic: false,
};

const text: TText = {
  id: "5",
  content: [charA, charB],
  location: {
    x: 200,
    y: 200,
  },
  size: {
    width: 100,
    height: 60,
  },
};

const text2: TText = {
  id: "5",
  content: [charC, charB, charA],
  location: {
    x: 200,
    y: 200,
  },
  size: {
    width: 100,
    height: 60,
  },
};

const slide: TSlide = {
  background: {
    path: "./img.png",
  },
  id: uid(),
  items: [text, img, shapeCircle, shapeSquare, shapeTriangle],
};

const slide1: TSlide = {
  background: {
    path: "./img_1.png",
  },
  id: uid(),
  items: [text2, img, shapeCircle, shapeSquare, shapeTriangle],
};

const slide2: TSlide = {
  background: {
    path: "./img.png",
  },
  id: uid(),
  items: [text, img, shapeCircle, shapeSquare, shapeTriangle],
};

const slide3: TSlide = {
  background: {
    path: "./img.png",
  },
  id: uid(),
  items: [text2, img, shapeCircle, shapeSquare, shapeTriangle],
};

const slide4: TSlide = {
  background: {
    path: "./img.png",
  },
  id: uid(),
  items: [text, img, shapeCircle, shapeSquare, shapeTriangle],
};

const slide5: TSlide = {
  background: {
    path: "./img.png",
  },
  id: uid(),
  items: [text2, img, shapeCircle, shapeSquare, shapeTriangle],
};

const slide6: TSlide = {
  background: {
    path: "./img.png",
  },
  id: uid(),
  items: [text, img, shapeCircle, shapeSquare, shapeTriangle],
};

export const presentation: TPresentation = {
  name: "Моя презинтация",
  slides: [slide, slide1, slide2, slide3, slide4, slide5, slide6],
  currentSlideId: slide.id,
};

const history: History = {
  actionNumber: 0,
  actions: [presentation],
};

export const editor: TEditor = {
  history: history,
  presentation: presentation,
};
