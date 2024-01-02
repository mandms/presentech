import { TShape, TItem, TText, TImage } from "../../types";
import Text from "./Text";
import Shape from "./Shape/Shape";
import Image from "./Image/Image";
import { useRef } from "react";
import useMoving from "../../hooks/useMoving.ts";

interface IItemProps {
  item: TItem;
  isMovable: boolean;
  //isActive: boolean;
  coefficient: number;
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

function Item({ item, isMovable, coefficient }: IItemProps): JSX.Element {
  const itemRef = useRef<HTMLDivElement>(null);
  useMoving(itemRef, isMovable);
  return (
    <div
      ref={itemRef}
      style={{
        position: "absolute",
        left: item.location.x * coefficient,
        top: item.location.y * coefficient,
          //boxShadow: isActive ? '0 0 0 2px rgba(0, 0, 0, 0.2)' : 'none'
      }}
    >
      {isText(item) && <Text coefficient={coefficient} text={item} />}
      {isImage(item) && <Image image={item} />}
      {isShape(item) && <Shape coefficient={coefficient} shape={item} />}
    </div>
  );
}

export default Item;
