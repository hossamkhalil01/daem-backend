const express = require("express");
const passport = require("passport");
const applicationController = require("../controllers/doctorsApplicationController");
const {
  isDoctor,
  isModerator,
  isUser,
  isDoctorOrModerator,
} = require("../middlewares/authorization");

// init router
const Router = express.Router();

// add auth middleware
Router.use(passport.authenticate("jwt", { session: false }));


/** 
GET 
Route: / 
Results: All Applications
**/
Router.get("/", isModerator, applicationController.getAllApplications);

/** 
GET 
Route: /id 
Results: Get Applications
**/
Router.get("/:id", isModerator, applicationController.getApplication);

/** 
POST 
Route: / 
Results: Create Application
**/
Router.post(
  "/",
  isUser,
  applicationController.createApplication
);


/** 
PUT
Route: /:id /approve
Results: Approve the application
**/
Router.post(
  "/:id/approve",
  isModerator,
  articlesController.approveApplication
);


/** 
PUT
Route: /:id/decline
Results: Decline the application
**/
Router.post(
  "/:id/decline",
  isModerator,
  articlesController.declineApplication
);


module.exports = Router;
