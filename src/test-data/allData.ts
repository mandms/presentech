import { Action, TChar, TEditor, History, TImage, TPresentation, ShapeType, TSlide, TText, TShape } from "../types";

const shapeCircle: TShape = {
  backgroundColor: "#fff",
  borderColor: "#000",
  id: "1",
  location: {
    x: 300,
    y: 70,
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
    x: 500,
    y: 90,
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
  fonSize: 0,
  fontFamily: "sans-serif",
  italic: true,
};

const charB: TChar = {
  id: 2,
  bold: true,
  symbol: "B",
  color: "#000",
  fonSize: 0,
  fontFamily: "sans-serif",
  italic: false,
};

const text: TText = {
  id: "5",
  content: [charA, charB],
  location: {
    x: 200,
    y: 500,
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
  id: 0,
  items: [text, img, shapeCircle, shapeSquare, shapeTriangle],
};

const slide1: TSlide = {
  background: {
    path: "./img.png",
  },
  id: 1,
  items: [text, img, shapeCircle, shapeSquare, shapeTriangle],
};

const slide2: TSlide = {
  background: {
    path: "./img.png",
  },
  id: 2,
  items: [text, img, shapeCircle, shapeSquare, shapeTriangle],
};

const slide3: TSlide = {
  background: {
    path: "./img.png",
  },
  id: 3,
  items: [text, img, shapeCircle, shapeSquare, shapeTriangle],
};

const slide4: TSlide = {
  background: {
    path: "./img.png",
  },
  id: 4,
  items: [text, img, shapeCircle, shapeSquare, shapeTriangle],
};

const slide5: TSlide = {
  background: {
    path: "./img.png",
  },
  id: 5,
  items: [text, img, shapeCircle, shapeSquare, shapeTriangle],
};

const slide6: TSlide = {
  background: {
    path: "./img.png",
  },
  id: 6,
  items: [text, img, shapeCircle, shapeSquare, shapeTriangle],
};

export const presentation: TPresentation = {
  name: "Моя презинтация",
  slides: [slide, slide1, slide2, slide3, slide4, slide5, slide6],
  currentSlideId: 0,
};

const action: Action = {
  presentationCopy: presentation,
};

const history: History = {
  actionNumber: 0,
  actions: [action],
};

export const editor: TEditor = {
  history: history,
  presentation: presentation,
};
