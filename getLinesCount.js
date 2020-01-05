const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * returns a promise that resolves into total number of lines in the file.
 * @param {string} directoryPath full path to the directory.
 * @param {string} fileName Name of the file with extension.
 */
module.exports =  function getLinesCount(directoryPath, fileName) {

  let directoryExists = false;
  let fileExists = false;

  const resultObject = {
    success: false,
    message: '',
    data : 0,
  };

  try {
    directoryExists = fs.existsSync(directoryPath);
  } catch (error) {
      console.error(error)
  }

  try {
    fileExists = !fileName || !directoryExists ? false : fs.existsSync(path.join(directoryPath, fileName));
  } catch (error) {
    console.error(error);
  }

  return new Promise(function(resolve,reject){
    
    if (!directoryExists) {
      reject( {
        success: false,
        message: `Error: ${directoryPath} doesnot exist.`
      });
    } else if (directoryExists && !fileExists) {
      reject ({
        success: false,
        message: `Error: ${path.join(directoryPath, fileName)} doesnot exist.`
      });
    } else if (directoryExists && fileExists) {
        const fullFilePath = path.join(directoryPath, fileName);
        // actual reading of line
        const readableStream =  fs.createReadStream(fullFilePath);

        const rl = readline.createInterface({
          input: readableStream,
          crlfDelay: Infinity,
        })

        let index = 0;

        rl.on('line',function(){
          index++;
        });

        rl.on('close',function(){
          resultObject.success = true;
          resultObject.message = `SUCCESS: ${fullFilePath} has total ${index} lines.`  
          resultObject.data = index;
          resolve(resultObject);
        })
      }
    })
};
