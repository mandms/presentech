import { TImage } from "../../../types";
import styles from "./Image.module.css";

interface IImageProps {
  image: TImage;
  coefficient: number;
}

function Image({ image, coefficient }: IImageProps): JSX.Element {
  return (
    <svg
      width={image.size.width * coefficient}
      height={image.size.height * coefficient}
      viewBox={`0 0 ${image.size.width * coefficient} ${image.size.height * coefficient}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <image className={styles.picture} xlinkHref={image.path} />
    </svg>
  );
}

export default Image;
