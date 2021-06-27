const express = require("express");
const ticketsController = require("../controllers/ticketsController");
const { isDoctor } = require("../middlewares/authorization");
const passport = require("passport");

// init router
const Router = express.Router();

const commentsRouter = require("./comments");
const upload = require("../middlewares/ticketImagesUpload");

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
Results: update Ticket
**/
Router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ticketsController.updateTicket
);

/** 
DELETE 
Route: / 
Results: delete Tickets
**/
Router.delete("/:id", ticketsController.deleteTicket);

/** 
DELETE 
Route: / 
Results: delete Tickets
**/
Router.delete("/:id/remove-doctor", ticketsController.removeTicketDoctor);

module.exports = Router;
