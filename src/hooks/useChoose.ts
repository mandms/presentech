import { MouseEvent, useEffect, useState } from "react";

function useChoose() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const slide = document.getElementById("current-slide");
    if (!slide) throw new Error("Slide does not exists");

    const onClick = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    slide.addEventListener("click", e => onClick(e as unknown as MouseEvent));
    return slide.removeEventListener("click", e => onClick(e as unknown as MouseEvent));
  }, []);

  return coords;
}

export default useChoose;
