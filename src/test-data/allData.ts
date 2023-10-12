import { Action, TChar, TEditor, History, Image, TPresentation, ShapeType, TSlide, TText, TShape } from "../types";

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
  backgroundColor: "#fff",
  borderColor: "#000",
  id: "2",
  location: {
    x: 700,
    y: 90,
  },
  size: {
    width: 90,
    height: 90,
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
    width: 200,
    height: 70,
  },
  type: ShapeType.Square,
};

const img: Image = {
  id: "4",
  location: {
    x: 400,
    y: 500,
  },
  path: "./logo192.png",
  size: {
    width: 100,
    height: 100,
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
    width: 400,
    height: 500,
  },
};

const slide: TSlide = {
  background: {
    path: "./img.png",
    id: "1",
    size: {
      width: 400,
      height: 400,
    },
    location: {
      x: 0,
      y: 0,
    },
  },
  id: 0,
  items: [text, img, shapeCircle, shapeSquare, shapeTriangle],
};

const presentation: TPresentation = {
  name: "",
  slides: [slide],
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
