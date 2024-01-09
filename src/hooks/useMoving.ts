import { RefObject, useEffect, useRef, useState } from "react";
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
  const [movable, setMovable] = useState(false);
  const position = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({ startX: 0, startY: 0, lastX: 0, lastY: 0 });
  const item = itemRef.current;
  const resizeElement = resizeRef.current;

  useEffect(() => {
    if (!item || !isSelected || !isMovable || !resizeElement) return;
    item.addEventListener("mousedown", onMouseDown);
    resizeElement.addEventListener("mousedown", onResizeDown);
    return () => {
      if (item) item.removeEventListener("mousedown", onMouseDown);
      if (resizeElement) resizeElement.removeEventListener("mousedown", onResizeDown);
    };
  });

  const onResizeDown = (e: MouseEvent) => {
    if (!item) return;
    if (!item.parentElement) return;
    resizing.current = true;
    position.current.startX = e.clientX - item.offsetWidth - item.offsetLeft;
    position.current.startY = e.clientY - item.offsetHeight - item.offsetTop;
    item.parentElement.addEventListener("mousemove", onResizeMove);
    document.addEventListener("mouseup", onResizeUp);
  };

  const onResizeMove = (e: MouseEvent) => {
    if (!item) return;
    if (!resizeElement) return;
    if (!resizing.current) return;
    setSize({
      width: item.offsetWidth / coefficient,
      height: item.offsetHeight / coefficient,
    });
    const x = e.clientX - position.current.startX - item.offsetLeft;
    const y = e.clientY - position.current.startY - item.offsetTop;
    item.style.width = `${x}px`;
    item.style.height = `${y}px`;
  };

  const onResizeUp = () => {
    if (!item) return;
    resizing.current = false;
    item.removeEventListener("mousemove", onResizeMove);
    document.removeEventListener("mouseup", onResizeUp);
  };

  const onMouseUp = () => {
    if (!item) return;
    const slide = item.parentElement;
    if (!slide) return;
    moving.current = false;
    position.current.lastX = item.offsetLeft;
    position.current.lastY = item.offsetTop;
    slide.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseDown = (e: MouseEvent) => {
    if (!item) return;
    const slide = item.parentElement;
    if (!slide) return;
    if (resizeElement?.contains(e.target as Node)) return;
    moving.current = true;
    position.current.startX = e.clientX - (!movable ? item.offsetLeft : 0);
    position.current.startY = e.clientY - (!movable ? item.offsetTop : 0);
    setMovable(true);
    document.addEventListener("mouseup", onMouseUp);
    slide.addEventListener("mousemove", onMouseMove);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!item) return;
    if (!moving.current) return;
    onMove({
      x: item.offsetLeft / coefficient,
      y: item.offsetTop / coefficient,
    });
    const x = e.clientX - position.current.startX + position.current.lastX;
    const y = e.clientY - position.current.startY + position.current.lastY;
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
  };
}

export default useMoving;
