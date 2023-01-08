const fs = require('fs');
const { resolve } = require('path');
const upload = require('../../../config/upload');

class LocalStorageProvider {
  async save(file, folder) {
    await fs.promises.rename(resolve(upload.tmpFolder, file), resolve(`${upload.tmpFolder}/${folder}`, file));

    return file;
  }

  async delete(file, folder) {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }

    await fs.promises.unlink(filename);
  }
}

module.exports = LocalStorageProvider;
