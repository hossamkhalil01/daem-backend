const express = require("express");
const passport = require("passport");
const articlesController = require("../controllers/articlesController");
const {
  isDoctor,
  isModerator,
  isDoctorOrModerator,
} = require("../middlewares/authorization");

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
  [passport.authenticate("jwt", { session: false }), isDoctorOrModerator],
  articlesController.createArticle
);

/** 
PUT
Route: /id 
Results: update Article
**/
Router.patch(
  "/:id",
  [passport.authenticate("jwt", { session: false }), isDoctorOrModerator],
  articlesController.updateArticle
);

/** 
DELETE 
Route: / 
Results: delete Article
**/
Router.delete(
  "/:id",
  [passport.authenticate("jwt", { session: false }), isDoctorOrModerator],
  articlesController.deleteArticle
);

module.exports = Router;
