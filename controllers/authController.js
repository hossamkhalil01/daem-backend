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

    // create the token
    const jwt = jwtUtils.issueJWT(user);

    // remove password from the user
    delete user._doc.password;


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
}

module.exports = { login };