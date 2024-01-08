import { RefObject, useEffect, useState, useRef } from "react";
import { TPosition } from "../types.ts";

function useMoving(
    itemRef: RefObject<HTMLDivElement>,
    resizeRef: RefObject<HTMLDivElement>,
    isMovable: boolean,
    onMove: (position: TPosition) => void,
    coefficient: number,
    isSelected: boolean,
) {
  const [moving, setMoving] = useState(false);
  const [resizing, setResizing] = useState(false);
  const position = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({ startX: 0, startY: 0, lastX: 0, lastY: 0 });

  const registerMovingListeners = () => {
    const item = itemRef.current;
    if (!item) throw new Error("Item does not exist");
    const slide = item.parentElement;
    if (!slide) throw new Error("Slide does not exist");

    const onMouseUp = () => {
      setMoving(false);
      position.current.lastX = item.offsetLeft;
      position.current.lastY = item.offsetTop;
      onMove({
        x: position.current.lastX / coefficient,
        y: position.current.lastY / coefficient,
      });
    };

    const onMouseDown = (e: MouseEvent) => {
      onMouseUp();
      setMoving(true);
      position.current.startX = e.clientX;
      position.current.startY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!moving) return;
      const x = e.clientX - position.current.startX + position.current.lastX;
      const y = e.clientY - position.current.startY + position.current.lastY;
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
    };

    item.addEventListener("mousedown", onMouseDown);
    item.addEventListener("mouseup", onMouseUp);
    slide.addEventListener("mousemove", onMouseMove);

    return () => {
      slide.removeEventListener("mousemove", onMouseMove);
      item.removeEventListener("mouseup", onMouseUp);
      item.removeEventListener("mousedown", onMouseDown);
    };
  };

  const registerResizeListeners = () => {
    const item = itemRef.current;
    if (!item) throw new Error("Item does not exist");
    const slide = item.parentElement;
    if (!slide) throw new Error("Slide does not exist");
    const resizeObj = resizeRef.current;
    if (!resizeObj) throw new Error("Resize object does not exist");

    const onResizeDown = (e: MouseEvent) => {
      setResizing(true);
      position.current.startX = e.clientX;
      position.current.startY = e.clientY;
      console.log(item.offsetWidth, item.offsetHeight);
      slide.addEventListener("mousemove", onResizeMove);
    };

    const onResizeMove = (e: MouseEvent) => {
      if (!resizing) return;
      const x = e.clientX - position.current.startX + position.current.lastX;
      const y = e.clientY - position.current.startY + position.current.lastY;
      item.style.width = `${x}px`;
      item.style.height = `${y}px`;
    };

    const onResizeUp = () => {
      setResizing(false);
      position.current.lastX = parseInt(item.style.width) / 2;
      position.current.lastY = parseInt(item.style.height);
    };

    resizeObj.addEventListener("mousedown", onResizeDown);
    resizeObj.addEventListener("mouseup", onResizeUp);

    return () => {
      resizeObj.removeEventListener("mousedown", onResizeDown);
      resizeObj.removeEventListener("mouseup", onResizeUp);
      slide.removeEventListener("mousemove", onResizeMove);
    };
  };

  useEffect(() => {
    //console.log(resizing);
    //console.log(moving);
    if (isSelected && isMovable && !resizing) {
      return registerMovingListeners()
    }
    if (isSelected && isMovable && !moving) {
      return registerResizeListeners();
    }
  }, [isSelected, isMovable, coefficient, resizing, moving]);

}

export default useMoving;
