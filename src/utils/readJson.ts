export const readJsonFile = (file: Blob) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = event => {
      if (event.target) {
        try {
          resolve(JSON.parse(event.target.result as string));
        } catch (e) {
          reject(e);
        }
      }
    };

    fileReader.onerror = error => reject(error);
    fileReader.readAsText(file);
  });
