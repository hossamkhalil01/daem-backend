const express = require("express");
const passport = require("passport");
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
Router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  articlesController.createArticle
);

/** 
PUT
Route: /id 
Results: update Article
**/
Router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  articlesController.updateArticle
);

/** 
DELETE 
Route: / 
Results: delete Article
**/
Router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  articlesController.deleteArticle
);

module.exports = Router;
