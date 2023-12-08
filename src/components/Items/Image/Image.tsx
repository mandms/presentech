import { TImage } from "../../../types";
import styles from "./Image.module.css";

interface IImageProps {
  image: TImage;
}

function Image({ image }: IImageProps): JSX.Element {
  return (
    <svg
      x={image.location.x}
      y={image.location.y}
      width={image.size.width}
      height={image.size.height}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <image className={styles.picture} xlinkHref={image.path} />
    </svg>
  );
}

export default Image;
