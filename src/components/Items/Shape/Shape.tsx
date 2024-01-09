import { ShapeType, TShape } from "../../../types";
import styles from "./Shape.module.css";
import { CSSProperties } from "react";

interface IShapeProps {
  shape: TShape;
}

function Shape({ shape }: IShapeProps): JSX.Element {
  const style: CSSProperties = {
    fill: shape.backgroundColor,
    stroke: shape.borderColor,
  };

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={style}
      className={styles.svg}
    >
      {shape.type === ShapeType.Triangle && <polygon className={styles.shape} points="0,100 50,0 100,100" />}
      {shape.type === ShapeType.Square && <polygon className={styles.shape} points="0,100 0,0 100,0 100,100" />}
      {shape.type === ShapeType.Circle && <circle className={styles.shape} cx="50" cy="50" r="50" />}
    </svg>
  );
}

export default Shape;
