const express = require("express");
const postsController = require("../controllers/postsController");

// init router
const Router = express.Router();

/** 
GET 
Route: / 
Results: All Posts
**/
Router.get("/", postsController.getTickets);

/** 
GET 
Route: /id 
Results: get Post
**/
Router.get("/:id", postsController.getPost);

/** 
POST 
Route: / 
Results: create Post
**/
Router.post("/", postsController.createPost);

/** 
PUT
Route: /id 
Results: update Post
**/
Router.get("/:id", postsController.updatePost);

/** 
DELETE 
Route: / 
Results: delete Posts
**/
Router.get("/:id", postsController.deletePost);

module.exports = Router;
