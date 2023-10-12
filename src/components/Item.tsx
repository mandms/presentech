import { Image, TShape, TItem, TText } from "../types";
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
      <div>
        <div>
          {isText(item) && <Text text={item} />}
          {isImage(item) && (
            <img
              src={item.path}
              style={{
                left: item.location.x,
                top: item.location.y,
                width: item.size.width,
                height: item.size.height,
                position: "absolute",
              }}
              alt={""}
            />
          )}
          {isShape(item) && <Shape shape={item} />}
        </div>
      </div>
    </>
  );
}

export default Item;
