const express = require("express");
const usersController = require("../controllers/usersController");
const { isModerator } = require("../middlewares/authorization");
const passport = require("passport");

// init router
const Router = express.Router();

/** 
GET 
Route: / 
Results: All Users
**/
Router.get("/",
  [passport.authenticate("jwt", { session: false }),
  ],
  usersController.getUsers);

/** 
GET 
Route: /id 
Results: get User
**/
Router.get("/:id", usersController.getUser);

/** 
POST 
Route: / 
Results: create User
**/
Router.post("/", usersController.createUser);

/** 
PUT
Route: /id 
Results: update User
**/
Router.get("/:id", usersController.updateUser);

/** 
DELETE 
Route: / 
Results: delete Users
**/
Router.get("/:id", usersController.deleteUser);

module.exports = Router;
