import { ShapeType, TShape } from "../types";
import "./Shape.css";

interface IShapeProps {
  shape: TShape;
}

function Shape(props: IShapeProps): JSX.Element {
  const shape = props.shape;
  return (
    <>
      {shape.type === ShapeType.Triangle && (
        <div
          className={"triangle"}
          style={{
            width: shape.size.width,
            height: shape.size.height,
            left: shape.location.x,
            top: shape.location.y,
            position: "absolute",
          }}
        ></div>
      )}
      {shape.type === ShapeType.Square && (
        <div
          className={"square"}
          style={{
            width: shape.size.width,
            height: shape.size.height,
            left: shape.location.x,
            top: shape.location.y,
            position: "absolute",
          }}
        ></div>
      )}
      {shape.type === ShapeType.Circle && (
        <div
          className={"circle"}
          style={{
            width: shape.size.width,
            height: shape.size.height,
            left: shape.location.x,
            top: shape.location.y,
            position: "absolute",
          }}
        ></div>
      )}
    </>
  );
}

export default Shape;
