const fsp = require('fs').promises;
const path = require('path');
const fileOrFolderExists = require('./fileOrFolderExists');

module.exports = async function writeStorage(
  directoryPath,
  fileName = null,
  fileData = null
) {
  const directoryExists = await fileOrFolderExists(directoryPath);

  let fileExists = null;

  if (fileName) {
    fileExists = await fileOrFolderExists(path.join(directoryPath, fileName));
  }

  if (fileData) {
    if (typeof fileData === 'object') {
      fileData = JSON.stringify(fileData, null, 2);
    }
  }

  // if directory doesnot exists then create directory and file.
  if (!directoryExists) {
    try {
      await fsp.mkdir(directoryPath);
      if (fileName) {
        await fsp.writeFile(
          path.join(directoryPath, fileName),
          fileData ? fileData : ''
        );
      }
      return {
        success: true,
        message: `SUCCESS: ${
          fileName
            ? path.join(directoryPath, fileName)
            : path.join(directoryPath)
        } created.`
      };
    } catch (error) {
      return { success1: false, message: error.toString() };
    }

    // if file name provided & file doesnot exist just go ahed and create it.
  } else if (directoryExists && fileName && !fileExists) {
    try {
      await fsp.writeFile(
        path.join(directoryPath, fileName),
        fileData ? fileData : ''
      );
      return {
        success: true,
        message: `SUCCESS: ${path.join(directoryPath, fileName)} created.`
      };
    } catch (error) {
      return { success2: false, message: error.toString() };
    }

    // right now it completely overwrites it.
    // if file exists, its doing the same thing as above, but i'm sure in future I'll have to change it.
  } else if (directoryExists && fileName && fileExists) {
    try {
      await fsp.writeFile(
        path.join(directoryPath, fileName),
        fileData ? fileData : ''
      );
      return {
        success: true,
        message: `SUCCESS: ${path.join(directoryPath, fileName)} updated.`
      };
    } catch (error) {
      return { success3: false, message: error.toString() };
    }
  }
};
