const express = require("express");
const authController = require("../controllers/authController");


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
Router.post("/register", authController.register);




module.exports = Router;