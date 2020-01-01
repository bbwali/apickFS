/**
 * library to read store and edit data
 */

const storageHander = require('./storageHandler');
const writeStorage = require('./writeStorage');
const removeStorage = require('./removeStorage');
const readStorage = require('./readStorage');
const fileOrFolderExists = require('./fileOrFolderExists');
const removeStorageRecursively = require('./removeStorageRecursively');
const readNthLine = require('./readNthLine');

const apickJsonDb = {};

apickJsonDb.readNthLine = readNthLine;

/**
 * returns a promise that resolves into true if it exists and false if it doesnot exist.
 * @param {string} storagePath full path to the file or directory. if file please include extension.
 */
apickJsonDb.fileOrFolderExists = fileOrFolderExists;

/**
 * returns a promise that resolves into a object with two fields exists and type
 * exists will be true if it exists
 * type will be 'file' for file or 'directory' for directory else null.
 * @param {string} storagePath full path to the file or directory. if file please include extension.
 */
apickJsonDb.storageHander = storageHander;

/**
 * if filename is provided and it exists then data sent is null then the file will made empty.
 * dont send filename or set it to null if you dont want to touch the file
 * @param {string} directoryPath full path to directory
 * @param {string} fileName filename with extension; optional; default null
 * @param {any} fileData file data; optional; default null
 *
 * Example :
 * writeStorage(path.join(__dirname, 'zoo4'), 'copy4_1.txt', JSON.stringify({hello:'world'}))
 * .then(data => {
 *   console.log(data);
 * })
 * .catch(e => {
 *   console.log(e);
 * });
 *
 * ** NOTE ** : if you are trying to store JSON, you must use JSON.stringify to stringify the JSON DATA else it will be coerced to [object object]
 *
 */
apickJsonDb.writeStorage = writeStorage;

/**
 * @param {string} storagePath full path of directory or file including extension for files
 * @param {boolean} recursive optional. set to true if we need to delete recursively.
 * returns a promise
 * example usage:
 * removeStorage(path.join(__dirname, 'zoo copy 5'), true)
 *   .then(data => {
 *     console.log(data);
 *   })
 *   .catch(e => {
 *     console.log(e);
 *   });
 */
apickJsonDb.removeStorage = removeStorage;

/**
 * The directory and its content will be deleted recursively.
 * @param {*} directoryPath full path to directory.
 */
apickJsonDb.removeStorageRecursively = removeStorageRecursively;

/**
 * @param {*} directoryPath full path to directory.
 * @param {*} fileName filename with extension.
 *
 * readStorage(path.join(__dirname), 'post.json')
 * .then(d => {
 *   console.log(d.data.topping);
 * })
 * .catch(e => {
 *   console.log(e);
 * });
 */

apickJsonDb.readStorage = readStorage;

module.exports = apickJsonDb;
