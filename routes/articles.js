const express = require("express");
const articlesController = require("../controllers/articlesController");

// init router
const Router = express.Router();

/** 
GET 
Route: / 
Results: All Articles
**/
Router.get("/", articlesController.getArticles);

/** 
GET 
Route: /id 
Results: get Article
**/
Router.get("/:id", articlesController.getArticle);

/** 
POST 
Route: / 
Results: create Article
**/
Router.post("/", articlesController.createArticle);

/** 
PUT
Route: /id 
Results: update Article
**/
Router.put("/:id", articlesController.updateArticle);

/** 
DELETE 
Route: / 
Results: delete Article
**/
Router.delete("/:id", articlesController.deleteArticle);

module.exports = Router;
