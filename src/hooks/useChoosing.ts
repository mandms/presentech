import { useEffect, useState } from "react";

function useChoosing(selected: boolean, removeSelection: (value: boolean) => void) {
  const slide = document.getElementById("current-slide");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!slide) return;
    if (!selected) return;
    const onClick = (e: MouseEvent) => {
      if (!slide) return;
      if (!selected) return;
      const coefficient = slide.getBoundingClientRect().width / 1000;
      setPosition({
        x: (e.clientX - slide.getBoundingClientRect().left) / coefficient - 45,
        y: (e.clientY - slide.getBoundingClientRect().top) / coefficient - 45,
      });
      //тут должна вызываться функция сохранения
      removeSelection(false);
      slide.style.cursor = "default";
    };

    slide.addEventListener("click", onClick);

    return () => {
      slide.removeEventListener("click", onClick);
    };
  }, [selected]);
  return position;
}

export default useChoosing;
