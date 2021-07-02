const fs = require("fs");

const deleteFile = (path) => {
  return fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const makeDir = (path) => {
  return fs.mkdirSync(path, { recursive: true });
};

const removeDir = (path) => {
  return fs.rmdirSync(path, { recursive: true });

}

module.exports = {
  deleteFile,
  makeDir,
  removeDir,
};
