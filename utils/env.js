require("dotenv").config();


const getVar = (key) => process.env[key];


module.exports = { getVar };