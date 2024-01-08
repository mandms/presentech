import { RefObject, useEffect, useRef } from "react";
import { TPosition, TSize } from "../types.ts";

function useMoving(
  itemRef: RefObject<HTMLDivElement>,
  resizeRef: RefObject<HTMLDivElement>,
  isMovable: boolean,
  onMove: (position: TPosition) => void,
  coefficient: number,
  isSelected: boolean,
  setSize: (size: TSize) => void,
) {
  const moving = useRef(false);
  const resizing = useRef(false);
  const position = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({ startX: 0, startY: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    if (itemRef.current && isSelected && isMovable && !resizing.current) {
      itemRef.current.addEventListener("mousedown", onMouseDown);
    }
    if (resizeRef.current && isSelected && isMovable && !moving.current) {
      resizeRef.current.addEventListener("mousedown", onResizeDown);
    }
    return () => {
      if (itemRef.current) itemRef.current.removeEventListener("mousedown", onMouseDown);
      if (resizeRef.current) resizeRef.current.removeEventListener("mousedown", onResizeDown);
    };
  }, [isSelected, isMovable, coefficient, moving, resizing]);

  const onResizeDown = (e: MouseEvent) => {
    if (!itemRef.current) return;
    if (!itemRef.current.parentElement) return;
    resizing.current = true;
    position.current.startX = e.clientX;
    position.current.startY = e.clientY;

    itemRef.current.parentElement.addEventListener("mousemove", onResizeMove);
    itemRef.current.addEventListener("mouseup", onResizeUp);
  };

  const onResizeMove = (e: MouseEvent) => {
    if (!resizing.current) return;
    if (!itemRef.current) return;
    const x = e.clientX - position.current.startX + position.current.lastX;
    const y = e.clientY - position.current.startY + position.current.lastY;
    itemRef.current.style.width = `${x}px`;
    itemRef.current.style.height = `${y}px`;
  };

  const onResizeUp = () => {
    const item = itemRef.current;
    if (!item) return;
    resizing.current = false;
    position.current.lastX = parseInt(item.style.width) / 2;
    position.current.lastY = parseInt(item.style.height);
    setSize({
      width: position.current.lastX,
      height: position.current.lastY,
    });
    resizeRef.current?.removeEventListener("mousedown", onResizeDown);
    item.removeEventListener("mousemove", onResizeMove);
    item.removeEventListener("mouseup", onResizeUp);
  };

  const onMouseUp = () => {
    const item = itemRef.current;
    if (!item) return;
    const slide = itemRef.current?.parentElement;
    if (!slide) return;
    moving.current = false;
    position.current.lastX = item.offsetLeft;
    position.current.lastY = item.offsetTop;
    onMove({
      x: position.current.lastX / coefficient,
      y: position.current.lastY / coefficient,
    });
    itemRef.current.removeEventListener("mousedown", onMouseDown);
    slide.removeEventListener("mousemove", onMouseMove);
    item.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseDown = (e: MouseEvent) => {
    const item = itemRef.current;
    if (!item) return;
    const slide = itemRef.current?.parentElement;
    if (!slide) return;
    moving.current = true;
    position.current.startX = e.clientX;
    position.current.startY = e.clientY;
    item.addEventListener("mouseup", onMouseUp);
    slide.addEventListener("mousemove", onMouseMove);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!moving.current) return;
    if (!itemRef.current) return;
    const x = e.clientX - position.current.startX + position.current.lastX;
    const y = e.clientY - position.current.startY + position.current.lastY;
    itemRef.current.style.left = `${x}px`;
    itemRef.current.style.top = `${y}px`;
  };
}

export default useMoving;
