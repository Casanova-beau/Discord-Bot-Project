const fs = require("fs");
const path = require("path");

module.exports = function getAllFiles(directory, foldersOnly = false) {
  let fileNames = [];

  try {
    const files = fs.readdirSync(directory, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(directory, file.name);

      if (file.isDirectory()) {
        if (foldersOnly) {
          fileNames.push(filePath);
        } else {
          fileNames = fileNames.concat(getAllFiles(filePath, foldersOnly));
        }
      } else if (file.isFile() && !foldersOnly) {
        fileNames.push(filePath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory "${directory}":`, error.message);
  }

  return fileNames;
};
