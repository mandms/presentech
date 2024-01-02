import { useState, useEffect, RefObject } from "react";

const useSelectedItem = (itemRef: RefObject<HTMLDivElement>, isMovable: boolean) => {
  const [isItemSelected, setIsItemSelected] = useState(false);

  useEffect(() => {
    if (!isMovable) return;
    const item = itemRef.current;
    if (!item) throw new Error("Item does not exist");
    const slide = item.parentElement;
    if (!slide) throw new Error("Slide does not exist");

    const handleClick = () => {
      item.style.border = "2px solid #000";
      setIsItemSelected(true);
    };

    const handleClickOutside = (event: MouseEvent) => {
      console.log(event);
      item.style.border = "none";
      setIsItemSelected(false);
    };

    slide.addEventListener("click", e => handleClickOutside(e));
    item.addEventListener("click", handleClick);

    return () => {
      slide.removeEventListener("click", handleClickOutside);
      item.removeEventListener("click", handleClick);
    };
  }, [itemRef]);

  return isItemSelected;
};

export default useSelectedItem;
