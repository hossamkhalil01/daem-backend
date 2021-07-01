const multer = require("multer");
const { makeDir } = require("../../utils/fileSystem");
const imageFilter = require("./imagesFilter");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const id = req.user._id;
    const path = `public/images/articles/${id}/`;
    makeDir(path);
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-article-" + fileName);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});

module.exports = upload;
