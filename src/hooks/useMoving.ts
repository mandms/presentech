import { RefObject, useEffect, useRef } from "react";
import { TPosition } from "../types.ts";

function useMoving(
    itemRef: RefObject<HTMLDivElement>,
    isMovable: boolean,
    onMove: (position: TPosition) => void,
    coefficient: number,
    isSelected: boolean,
) {
  const moving = useRef<boolean>(false);
  const position = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({ startX: 0, startY: 0, lastX: 0, lastY: 0 });

  const registerListeners = () => {
    const item = itemRef.current;
    if (!item) throw new Error("Item does not exist");

    const slide = item.parentElement;
    if (!slide) throw new Error("Slide does not exist");

    const onMouseUp = () => {
      moving.current = false;
      position.current.lastX = item.offsetLeft;
      position.current.lastY = item.offsetTop;
      onMove({
        x: position.current.lastX / coefficient,
        y: position.current.lastY / coefficient,
      });
    };

    const onMouseDown = (e: MouseEvent) => {
      onMouseUp();
      moving.current = true;
      position.current.startX = e.clientX;
      position.current.startY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!moving.current) return;
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

  useEffect(() => {
    if (isSelected && isMovable) {
      return registerListeners();
    }
  }, [isSelected, isMovable, coefficient]);

}

export default useMoving;