import { TShape, TItem, TText, TImage } from "../../types";
import Text from "./Text";
import Shape from "./Shape/Shape";
import Image from "./Image/Image";

interface IItemProps {
  item: TItem;
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

function Item({ item }: IItemProps): JSX.Element {
  return (
    <g>
      {isText(item) && <Text text={item} />}
      {isImage(item) && <Image image={item} />}
      {isShape(item) && <Shape shape={item} />}
    </g>
  );
}

export default Item;
