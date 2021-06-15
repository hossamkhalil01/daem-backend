const express = require("express");
const commentsController = require("../controllers/commentsController");

// init router
const Router = express.Router();

/** 
GET 
Route: / 
Results: All Comments
**/
Router.get("/", commentsController.getComments);

/** 
GET 
Route: /id 
Results: get Comment
**/
Router.get("/:id", commentsController.getComment);

/** 
POST 
Route: / 
Results: create Comment
**/
Router.post("/", commentsController.createComment);

/** 
PUT
Route: /id 
Results: update Comment
**/
Router.get("/:id", commentsController.updateComment);

/** 
DELETE 
Route: / 
Results: delete Comment
**/
Router.get("/:id", commentsController.deleteComment);

module.exports = Router;
