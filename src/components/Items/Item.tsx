import { TShape, TItem, TText, TImage, TPosition } from "../../types";
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
  useMoving(itemRef, isMovable, onMove, isSelected);
  return (
    <div
      ref={itemRef}
      style={{
        position: "absolute",
        left: item.location.x * coefficient,
        top: item.location.y * coefficient,
        border: isSelected ? "2px solid red" : "none",
        display: "flex",
        boxSizing: "border-box",
      }}
      onDoubleClick={() => {
        selectItem();
      }}
    >
      {isText(item) && <Text coefficient={coefficient} text={item} />}
      {isImage(item) && <Image image={item} coefficient={coefficient} />}
      {isShape(item) && <Shape coefficient={coefficient} shape={item} />}
    </div>
  );
}

export default Item;
