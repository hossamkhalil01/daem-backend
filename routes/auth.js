const express = require("express");
const authController = require("../controllers/authController");
const passport = require("passport");

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


/** 
GET 
Route: /user
Results: {user}
**/
Router.get("/user", passport.authenticate("jwt", { session: false }), authController.getAuthUser);

module.exports = Router;
