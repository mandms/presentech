import { RefObject, useEffect, useRef } from "react";

function useMoving(itemRef: RefObject<HTMLDivElement>) {
  const moving = useRef<boolean>(false);
  const position = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({ startX: 0, startY: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    const item = itemRef.current;
    if (!item) throw new Error("Item does not exists");
    const slide = item.parentElement;
    if (!slide) throw new Error("Slide does not exists");
    const onMouseUp = () => {
      moving.current = false;
      position.current.lastX = item.offsetLeft;
      position.current.lastY = item.offsetTop;
    };

    const onMouseDown = (e: MouseEvent) => {
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
      console.log(x, " - ", y);
      console.log(item.style.left, " + ", item.style.top);
      console.log(e.clientX - position.current.startX, " = ", e.clientY - position.current.startY);
    };

    item.addEventListener("mousedown", e => onMouseDown(e as unknown as MouseEvent));
    item.addEventListener("mouseup", onMouseUp);
    slide.addEventListener("mousemove", e => onMouseMove(e as unknown as MouseEvent));

    return () => {
      slide.removeEventListener("mousemove", e => onMouseMove(e as unknown as MouseEvent));
      item.removeEventListener("mouseup", onMouseUp);
      item.removeEventListener("mousedown", e => onMouseDown(e as unknown as MouseEvent));
    };
  }, [itemRef]);
}

export default useMoving;
