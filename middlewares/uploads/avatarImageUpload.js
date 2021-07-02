const multer = require("multer");
const fs = require("fs");
const imageFilter = require("./imagesFilter");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = "public/images/avatars/";
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-avatar-" + fileName);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});

module.exports = upload;
