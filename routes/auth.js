const express = require("express");
const jwtUtils = require("../utils/auth/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  statusCodes,
  sendResponse,
  sendError,
  errorMessages,
} = require("../utils/responses");

// init router
const Router = express.Router();

/** 
POST 
Route: / login
Results: {user , token , expiresIn}
**/

Router.post("/login", async (req, res) => {

  try {
    const user = await User.findOne({ email: req.body.email });
    // user not found
    if (!user)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    const passwordIsValid = bcrypt.compare(req.body.password, user.password);

    if (!passwordIsValid) {
      return sendError(
        res,
        errorMessages.notFound,
        statusCodes.error.invalidData
      );
    }

    // create the token
    const jwt = jwtUtils.issueJWT(user);

    return sendResponse(
      res,
      { user, token: jwt.token, expiresIn: jwt.expiresIn },
      statusCodes.success.ok
    );
  } catch (error) {
    return sendError(
      res,
      errorMessages.notFound,
      statusCodes.error.invalidData
    );
  }
});

module.exports = Router;