const express = require("express");
const notificationsController = require("../controllers/notificationsController");

// init router
const Router = express.Router({
  mergeParams: true,
});

/**
GET 
Route: / 
Results: All Notifications
**/
Router.get(
  "/",
  notificationsController.getNotifications
);


/** 
PUT
Route: /id 
Results: update Notification
**/
Router.patch("/read", notificationsController.setReadNotifications);

module.exports = Router;
