import { RefObject, useEffect } from "react";

function useItemResize(resizeRef: RefObject<HTMLDivElement>, isSelected: boolean) {
  useEffect(() => {
    if (!isSelected) return;
    const resizeObj = resizeRef.current;
    if (!resizeObj) throw new Error("resizeObj does not exists");
    const onMouseDown = () => {
      console.log('INSTASAMKA')
    };
    resizeObj.addEventListener("mousedown", onMouseDown);
  }, [resizeRef]);
}

export default useItemResize;
