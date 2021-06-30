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
Route: /specialities
Results: All Available Specialities
**/
Router.get("/specialities", applicationController.getSpecialities);



/** 
GET 
Route: /id 
Results: Get Any application (moderators only)
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
  applicationController.approveApplication
);


/** 
PUT
Route: /:id/decline
Results: Reject the application
**/
Router.post(
  "/:id/reject",
  isModerator,
  applicationController.rejectApplication
);


module.exports = Router;
