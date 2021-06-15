const jwtUtils = require("../utils/auth/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  statusCodes,
  sendResponse,
  sendError,
  errorMessages,
} = require("../utils/responses");


const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // user not found
    if (!user)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);


    const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrectPassword) {
      return sendError(
        res,
        errorMessages.notFound,
        statusCodes.error.invalidData
      );
    }

    return sendResponse(
      res,
      createTokenResponse(user),
      statusCodes.success.ok
    );

  } catch (error) {

    console.log(error);
    return sendError(
      res,
      errorMessages.notFound,
      statusCodes.error.invalidData
    );
  }
}


const register = async (req, res) => {

  try {
    const user = await User.create(req.body);

    return sendResponse(
      res,
      createTokenResponse(user),
      statusCodes.success.created
    );
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  };
}


// create user token and return the response
const createTokenResponse = (user) => {

  const jwt = jwtUtils.issueJWT(user);

  // remove password from the user
  delete user._doc.password;

  return { user, token: jwt.token, expiresIn: jwt.expiresIn };
}


module.exports = { login, register };