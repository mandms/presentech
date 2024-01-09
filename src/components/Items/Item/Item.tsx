import { TShape, TItem, TText, TImage, TPosition, TSize } from "../../../types.ts";
import Text from "../Text/Text.tsx";
import Shape from "../Shape/Shape.tsx";
import Image from "../Image/Image.tsx";
import { CSSProperties, useRef } from "react";
import useMoving from "../../../hooks/useMoving.ts";
import styles from "./Item.module.css";
import { AppDispatch } from "../../../redux/rootReducer.ts";
import { connect } from "react-redux";

interface IItemProps {
  item: TItem;
  isMovable: boolean;
  coefficient: number;
  selectItem: () => void;
  isSelected: boolean;
  onMove: (position: TPosition) => void;
  setSize: (item: TItem, size: TSize) => void;
  setTextContent: (item: TText, content: string) => void;
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

function Item({
  item,
  isMovable,
  coefficient,
  selectItem,
  onMove,
  isSelected,
  setSize,
  setTextContent,
}: IItemProps): JSX.Element {
  const itemRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  useMoving(itemRef, resizeRef, isMovable, onMove, coefficient, isSelected, size => setSize(item, size));

  const style: CSSProperties = {
    left: item.location.x * coefficient,
    top: item.location.y * coefficient,
    width: item.size.width * coefficient,
    height: item.size.height * coefficient,
    border: isSelected && isMovable ? "2px solid #1A73E8FF" : "none",
    cursor: isSelected ? "move" : "auto",
  };

  return (
    <div ref={itemRef} style={style} className={styles.wrapper} onClick={() => isMovable && selectItem()}>
      {isText(item) && <Text setTextContent={value => setTextContent(item, value)} text={item} />}
      {isImage(item) && <Image image={item} coefficient={coefficient} />}
      {isShape(item) && <Shape shape={item} />}
      {isSelected && isMovable && <div ref={resizeRef} className={styles.resize}></div>}
    </div>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setSize: (item: TItem, size: TSize) => {
      dispatch({
        type: "SET_ITEM_SIZE",
        payload: { item, size },
      });
    },
    setTextContent: (item: TText, content: string) => {
      dispatch({
        type: "SET_TEXT_CONTENT",
        payload: { item, content },
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(Item);
