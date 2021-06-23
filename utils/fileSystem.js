const fs = require('fs');

const deleteFile = (path) => {

  return fs.unlink(path, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
}


module.exports = {
  deleteFile,
}