const express = require("express");
const authController = require("../controllers/authController");
// init router
const Router = express.Router();

/** 
POST 
Route: / login
Results: {user , token , expiresIn}
**/
Router.post("/login", authController.login);


module.exports = Router;