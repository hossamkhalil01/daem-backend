const express = require("express");
const doctorsController = require("../controllers/doctorsController");

// init router
const Router = express.Router();

/** 
GET 
Route: / 
Results: get All doctors
**/
Router.get("/", doctorsController.getDoctors);

module.exports = Router;
