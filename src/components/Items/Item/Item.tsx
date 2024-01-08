import { TShape, TItem, TText, TImage, TPosition } from "../../../types.ts";
import Text from "../Text/Text.tsx";
import Shape from "../Shape/Shape.tsx";
import Image from "../Image/Image.tsx";
import { CSSProperties, useRef } from "react";
import useMoving from "../../../hooks/useMoving.ts";
import styles from "./Item.module.css";
import useItemResize from "../../../hooks/useItemResize.ts";

interface IItemProps {
  item: TItem;
  isMovable: boolean;
  coefficient: number;
  selectItem: () => void;
  isSelected: boolean;
  onMove: (position: TPosition) => void;
}

function isImage(item: TItem): item is TImage {
  return (item as TImage).path !== undefined;
}

function isText(item: TItem): item is TText {
  return (item as TText).content !== undefined;
}

function isShape(item: TItem): item is TShape {
  return (item as TShape).type !== undefined;
}

function Item({ item, isMovable, coefficient, selectItem, onMove, isSelected }: IItemProps): JSX.Element {
  const itemRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  useItemResize(resizeRef, isSelected);
  useMoving(itemRef, resizeRef, isMovable, onMove, coefficient, isSelected);

  const style: CSSProperties = {
    left: item.location.x * coefficient,
    top: item.location.y * coefficient,
    width: item.size.width * coefficient,
    height: item.size.height * coefficient,
    border: isSelected && isMovable ? "2px solid red" : "none",
  };

  return (
    <div ref={itemRef} style={style} className={styles.wrapper} onDoubleClick={() => isMovable && selectItem()}>
      {isText(item) && <Text coefficient={coefficient} text={item} />}
      {isImage(item) && <Image image={item} coefficient={coefficient} />}
      {isShape(item) && <Shape shape={item} />}
      {isSelected && isMovable && <div ref={resizeRef} className={styles.resize}></div>}
    </div>
  );
}

export default Item;
