const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

/**
 * Writes a line or several lines to the end of the file.
 * @param {string} directoryPath full path to the directory.
 * @param {string} fileName Name of the file with extension.
 * @param <data or array of data> data can be a string, an object or an array. If its an object or an array, it will be parasd to a valid json. else it will be stored as a string.
 */
module.exports = async function writeLines(
  directoryPath,
  fileName,
  arrayOfLinesofData
) {
  let directoryExists = fs.existsSync(directoryPath);
  let fileExists =
    !fileName || !directoryExists
      ? false
      : await fs.existsSync(path.join(directoryPath, fileName));

  if (!directoryExists) {
    return {
      success: false,
      message: `Error: ${directoryPath} doesnot exist.`
    };
  } else if (directoryExists && !fileExists) {
    return {
      success: false,
      message: `Error: ${path.join(directoryPath, fileName)} doesnot exist.`
    };
  } else if (directoryExists && fileExists) {
    let filehandle;
    try {
      // actual writing of line
      const fullFilePath = path.join(directoryPath, fileName);
      filehandle = await fsp.open(fullFilePath, 'a');

      if (
        arrayOfLinesofData &&
        Array.isArray(arrayOfLinesofData) &&
        arrayOfLinesofData.length > 0
      ) {
        arrayOfLinesofData.forEach(async data => {
          await fsp.appendFile(filehandle, `\r\n${parsedData(data)}`);
        });
        return {
          success: true,
          message: `SUCCESS: ${arrayOfLinesofData.length} lines successfully written to ${fileName}.`
        };
      } else {
        if (arrayOfLinesofData) {
          await fsp.appendFile(
            filehandle,
            `\r\n${parsedData(arrayOfLinesofData)}`
          );
          return {
            success: true,
            message: `SUCCESS: 1 line successfully written to ${fileName}.`
          };
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.toString()
      };
    } finally {
      if (filehandle !== undefined) await filehandle.close();
    }
  }
};

function parsedData(fileData) {
  try {
    if (typeof fileData === 'object') {
      fileData = JSON.stringify(fileData);
    }
    return fileData;
  } catch (error) {
    return fileData;
  }
}
