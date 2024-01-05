import { RefObject, useEffect, useState } from "react";

export const useSlideResize = (ref: RefObject<SVGSVGElement>, isPreview: boolean) => {
  const [size, setSize] = useState<{
    w: number;
    h: number;
  }>({ w: 1000, h: 500 });

  const sizeObserver = new ResizeObserver(entries => {
    setSize({
      w: entries[0].target.getBoundingClientRect().width,
      h: entries[0].target.getBoundingClientRect().height,
    });
  });

  useEffect(() => {
    const slide = ref.current;
    if (!slide) return;
    sizeObserver.observe(slide);
    return () => sizeObserver.disconnect();
  }, [ref, sizeObserver]);

  if (isPreview) return { size: { w: 1000, h: 565.5 }, coefficient: 1 };
  return { size, coefficient: size.w / 1000 };
};

export default useSlideResize;
