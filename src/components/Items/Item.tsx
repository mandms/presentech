import { TShape, TItem, TText, TImage } from "../../types";
import Text from "./Text";
import Shape from "./Shape/Shape";
import Image from "./Image/Image";
import { useRef } from "react";
import useMoving from "../../hooks/useMoving.ts";

interface IItemProps {
  item: TItem;
  isMovable: boolean;
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

function Item({ item, isMovable }: IItemProps): JSX.Element {
  const itemRef = useRef<HTMLDivElement>(null);
  isMovable && useMoving(itemRef);
  return (
    <div
      ref={itemRef}
      style={{
        position: "absolute",
        left: item.location.x,
        top: item.location.y,
      }}
    >
      {isText(item) && <Text text={item} />}
      {isImage(item) && <Image image={item} />}
      {isShape(item) && <Shape shape={item} />}
    </div>
  );
}

export default Item;
