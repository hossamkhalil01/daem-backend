const util = require("util");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images/tickets/");
  },
  filename: (req, file, callback) => {
    const filename = `${Date.now()}-daem-${file.originalname
      .toLowerCase()
      .split(" ")
      .join("-")}`;
    callback(null, filename);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

var uploadFiles = upload.array("ticketImages", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
