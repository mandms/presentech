import { TShape, TItem, TText, TImage } from "../../types";
import Text from "./Text";
import Shape from "./Shape/Shape";
import Image from "./Image/Image";
import { useRef, useEffect } from "react";
import useMoving from "../../hooks/useMoving.ts";
import useSelectedItem from "../../hooks/useSelecteditem.ts";
//import useSelectedItem from "../../hooks/useSelecteditem.ts";

interface IItemProps {
  item: TItem;
  isMovable: boolean;
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
    const isItemSelected = useSelectedItem(itemRef, isMovable)
    useMoving(itemRef, isMovable);

    useEffect(() => {
        const item = itemRef.current;
        if (!item) return;
        item.style.boxShadow = isItemSelected ? '0 0 0 2px rgb(255, 102, 102)' : 'none';
    }, [isItemSelected]);

    return (
        <div
            ref={itemRef}
            style={{
                position: "absolute",
                left: item.location.x * coefficient,
                top: item.location.y * coefficient,
            }}
        >
            {isText(item) && <Text coefficient={coefficient} text={item} />}
            {isImage(item) && <Image image={item} />}
            {isShape(item) && <Shape coefficient={coefficient} shape={item} />}
        </div>
    );
}


export default Item;
