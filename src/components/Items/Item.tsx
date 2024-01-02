import { TShape, TItem, TText, TImage } from "../../types";
import Text from "./Text";
import Shape from "./Shape/Shape";
import Image from "./Image/Image";
import { useRef } from "react";
import useMoving from "../../hooks/useMoving.ts";

interface IItemProps {
  item: TItem;
  isMovable: boolean;
  coefficient: number;
  selectItem: () => void;
  isSelected: boolean;
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

function Item({ item, isMovable, coefficient, selectItem, isSelected }: IItemProps): JSX.Element {
  const itemRef = useRef<HTMLDivElement>(null);
  useMoving(itemRef, isMovable);
  return (
    <div
      ref={itemRef}
      style={{
        position: "absolute",
        left: item.location.x * coefficient,
        top: item.location.y * coefficient,
        border: isSelected ? "2px solid #000" : "none",
      }}
      onClick={() => selectItem()}
    >
      {isText(item) && <Text coefficient={coefficient} text={item} />}
      {isImage(item) && <Image image={item} />}
      {isShape(item) && <Shape coefficient={coefficient} shape={item} />}
    </div>
  );
}

export default Item;
