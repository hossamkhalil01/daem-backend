const express = require("express");
const ticketsController = require("../controllers/ticketsController");

// init router
const Router = express.Router();

/** 
GET 
Route: / 
Results: All Tickets
**/
Router.get("/", ticketsController.getTickets);

module.exports = Router;