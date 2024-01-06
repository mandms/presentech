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

  useEffect(() => {
    if (!isSelected) return; //СРОЧНО ПОФИКСИТЬ ЕПТА!
    if (!isMovable) return;
    const item = itemRef.current;
    if (!item) throw new Error("Item does not exists");
    const slide = item.parentElement;
    if (!slide) throw new Error("Slide does not exists");
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

    item.addEventListener("mousedown", e => onMouseDown(e));
    item.addEventListener("mouseup", onMouseUp);
    slide.addEventListener("mousemove", e => onMouseMove(e));

    return () => {
      slide.removeEventListener("mousemove", e => onMouseMove(e));
      item.removeEventListener("mouseup", onMouseUp);
      item.removeEventListener("mousedown", e => onMouseDown(e));
    };
  }, [itemRef, isSelected, isMovable, coefficient]);
}

export default useMoving;
