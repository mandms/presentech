import { ShapeType, TShape } from "../../../types";
import styles from "./Shape.module.css";

interface IShapeProps {
  shape: TShape;
  coefficient: number;
}

function Shape({ shape, coefficient }: IShapeProps): JSX.Element {
  return (
    <svg
      version="1.1"
      width={shape.size.width * coefficient}
      height={shape.size.height * coefficient}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill={shape.backgroundColor}
      stroke={shape.borderColor}
      vectorEffect="non-scaling-stroke"
      x={shape.location.x}
      y={shape.location.y}
      className={styles.svg}
    >
      {shape.type === ShapeType.Triangle && (
        <polygon className={styles.shape} vectorEffect="non-scaling-stroke" points="0,100 50,0 100,100" />
      )}
      {shape.type === ShapeType.Square && (
        <polygon className={styles.shape} vectorEffect="non-scaling-stroke" points="0,100 0,0 100,0 100,100" />
      )}
      {shape.type === ShapeType.Circle && <circle className={styles.shape} cx="50" cy="50" r="50" />}
    </svg>
  );
}

export default Shape;
