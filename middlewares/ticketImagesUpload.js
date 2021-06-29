const multer = require("multer");
const { makeDir } = require("../utils/fileSystem");
const imageFilter = require("./imagesFilter");

// save images to public folder using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const id = req.user._id;
    const path = `public/images/tickets/${id}`;
    makeDir(path);
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-ticket-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});

module.exports = upload;
