const express = require("express");
const usersController = require("../controllers/usersController");
const { isModerator } = require("../middlewares/authorization");
const passport = require("passport");

// init router
const Router = express.Router();

// add auth mdidleware
Router.use(passport.authenticate("jwt", { session: false }));

/** 
GET 
Route: / 
Results: All Users
**/
Router.get("/", usersController.getUsers);

/** 
GET 
Route: /:id 
Results: get User
**/
Router.get("/:id", usersController.getUser);


/** 
Patch
Route: /:id 
Results: update User role (moderator only)
**/
Router.patch("/:id", isModerator, usersController.updateUserRole);

/** 
Patch
Route: / 
Results: update user (current user's data)
**/
Router.patch("/", usersController.updateCurrentUser);


module.exports = Router;
