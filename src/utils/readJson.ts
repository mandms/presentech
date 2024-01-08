import {TPresentation} from "../types.ts";

function validatePresentation(jsonData: any): jsonData is TPresentation {
    if (
        jsonData &&
        typeof jsonData.name === 'string' &&
        Array.isArray(jsonData.slides)
    ) {
        return true;
    }
    return false;
}

export const readJsonFile = (file: Blob) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = event => {
      if (event.target) {
        try {
            const jsonData = JSON.parse(event.target.result as string);
            if (validatePresentation(jsonData)) {
                resolve(jsonData);
            } else {
                reject(new Error('JSON does not match the expected TPresentation type.'));
            }
        } catch (e) {
          reject(e);
        }
      }
    };

    fileReader.onerror = error => reject(error);
    fileReader.readAsText(file);
  });
