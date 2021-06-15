const express = require("express");
const ticketsController = require("../controllers/ticketsController");

// init router
const Router = express.Router();

const commentsRouter = require("./comments");

Router.use("/:ticketId/comments", commentsRouter);

/** 
GET 
Route: / 
Results: All Tickets
**/
Router.get("/", ticketsController.getTickets);

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
Router.post("/", ticketsController.createTicket);

/** 
PUT
Route: /id 
Results: update Ticket
**/
Router.get("/:id", ticketsController.updateTicket);

/** 
DELETE 
Route: / 
Results: delete Tickets
**/
Router.get("/:id", ticketsController.deleteTicket);

module.exports = Router;
