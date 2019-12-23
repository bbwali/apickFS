const fsp = require('fs').promises;

module.exports = async function removeStorage(storagePath, recursive = false) {
  const { exists, type } = await this.storageHander(storagePath);
  if (exists) {
    if (type === 'file') {
      console.log('type is file');
      await fsp.unlink(storagePath);
      return { success: true, message: `FILE deleted: ${storagePath}` };
    } else if (type === 'directory') {
      console.log('type is directory');
      console.log(storagePath, recursive);
      try {
        await fsp.rmdir(storagePath, { recursive: recursive });
        return {
          success: true,
          message: `DIRECTORY deleted : ${storagePath}`
        };
      } catch (e) {
        return { success: false, message: e.toString() };
      }
    } else {
      return {
        success: false,
        message: `NOT Deleted : ${storagePath} Exists but right now we support only files and directories.`
      };
    }
  } else {
    return { success: false, message: 'File/Directory doesnot exist.' };
  }
};
