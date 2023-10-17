import { Image, TShape, TItem, TText } from "../../types";
import Text from "./Text";
import Shape from "./Shape";

interface IItemProps {
  item: TItem;
}

function isImage(item: TItem): item is Image {
  return (item as Image).path !== undefined;
}

function isText(item: TItem): item is TText {
  return (item as TText).content !== undefined;
}

function isShape(item: TItem): item is TShape {
  return (item as TShape).type !== undefined;
}

function Item(props: IItemProps): JSX.Element {
  const item = props.item;
  return (
    <>
      {isText(item) && <Text text={item} />}
      {isImage(item) && (
        <svg
          x={item.location.x}
          y={item.location.y}
          width={item.size.width}
          height={item.size.height}
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <image
            style={{
              width: "100%",
              height: "100%",
            }}
            xlinkHref={item.path}
          />
        </svg>
      )}
      {isShape(item) && <Shape shape={item} />}
    </>
  );
}

export default Item;
