const express = require("express");

const Router = express.Router();

Router.get("/", (request, response)=>{
    response.send("working fine")
})


module.exports = Router