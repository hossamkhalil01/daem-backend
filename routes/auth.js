const express = require("express");
const multer = require("multer");
const authController = require("../controllers/authController");

/* Setup image upload */

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/avatars/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Init Upload
const upload = multer({
  storage,
});

// init router
const Router = express.Router();

/** 
POST 
Route: /login
Results: {user , token , expiresIn}
**/
Router.post("/login", authController.login);

/** 
POST 
Route: /rgister
Results: {user , token , expiresIn}
**/
Router.post("/register", upload.single("avatar"), authController.register);

module.exports = Router;
