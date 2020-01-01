const fsp = require('fs').promises;
const fs = require('fs');
const path = require('path');
const fileOrFolderExists = require('./fileOrFolderExists');
const readline = require('readline');

module.exports = async function readNthLine(directoryPath, fileName, lineNumber) {
  
  const directoryExists = await fileOrFolderExists(directoryPath);
  
  const fileExists = !fileName
    ? null
    : await fileOrFolderExists(path.join(directoryPath, fileName));

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
    try {
      const fullFilePath = path.join(directoryPath, fileName);
      if (!lineNumber ||  lineNumber < 0 || lineNumber % 1 !== 0){
        return {
          success: false,
          message: `Error: ${fullFilePath} exists. But the lineNumber is invalid.`
        }
      } else {
        // actual reading of line
        const readableStream =  fs.createReadStream(fullFilePath);

        const rl = readline.createInterface({
          input: readableStream,
          crlfDelay: Infinity,
        })

        let index = 0;

        for await (const line of rl) {
          if (index++ === lineNumber) {
            rl.close();
            readableStream.close();
            return readLineSuccess(fullFilePath,lineNumber, line);
          }
        }

        readableStream.on('end', function() {
          return outOfRangeError(fullFilePath, lineNumber)
        })

      }
    } catch (error) {
      return {
        success: false,
        message: error.toString()
      };
    }
  }
};

function JSONData(str) {
  try {
    return JSON.parse(str);
  } catch (err) {
    return str;
  }
}

function outOfRangeError(filepath, lineNumber) {
  return {
    success: false,
    message: `Line number index ${lineNumber} does not exist in ${filepath}. Internal index is zero-based.`
  }
}

function readLineSuccess(filepath, lineNumber, fileData){
  return {
    success: true,
    message: `SUCCESS: line number ${lineNumber} successfully read from ${filepath}.`,
    data: JSONData(fileData)
  };
}
