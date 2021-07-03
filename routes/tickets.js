const express = require("express");
const ticketsController = require("../controllers/ticketsController");
const {
  isDoctor,
  isModerator,
  isUser,
  isDoctorOrModerator,
} = require("../middlewares/authorization");
const passport = require("passport");

// init router
const Router = express.Router();

const commentsRouter = require("./comments");

Router.use("/:ticketId/comments", commentsRouter);

/** 
GET 
Route: / 
Results: All Tickets
**/
Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  ticketsController.getTickets
);

/** 
GET 
Route: /id 
Results: get Ticket
**/
Router.get("/:id", ticketsController.getTicket);

/** 
Ticket 
Route: / 
Results: create Ticket
**/
Router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ticketsController.createTicket
);

/**
PUT
Route: /id 
Results: user update Ticket
**/
Router.patch(
  "/user/:id",
  [passport.authenticate("jwt", { session: false }), isUser],
  ticketsController.userUpdateTicket
);

/**
PUT
Route: /id 
Results: doctor update Ticket
**/
Router.patch(
  "/doctor/:id",
  [passport.authenticate("jwt", { session: false }), isDoctorOrModerator],
  ticketsController.doctorUpdateTicket
);

/**
PUT
Route: /id 
Results: moderator update Ticket
**/
Router.patch(
  "/moderator/:id",
  [passport.authenticate("jwt", { session: false }), isModerator],
  ticketsController.moderatorUpdateTicket
);
;

/** 
DELETE 
Route: / 
Results: delete Tickets
**/
Router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ticketsController.deleteTicket
);

/** 
DELETE 
Route: / 
Results: delete Tickets
**/
Router.delete(
  "/:id/remove-doctor",
  passport.authenticate("jwt", { session: false }),
  ticketsController.removeTicketDoctor
);

module.exports = Router;
