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


/** 
GET 
Route: / 
Results: get  doctor
**/
Router.get("/:id", doctorsController.getDoctor);


module.exports = Router;
