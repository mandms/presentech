import { TPresentation } from "../types.ts";

export function saveJsonObjToFile(presentation: TPresentation) {
  const text = JSON.stringify(presentation);
  const name = `${presentation.name}.json`;
  const type = "text/plain";
  const a = document.createElement("a");
  const file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
  a.remove();
}
