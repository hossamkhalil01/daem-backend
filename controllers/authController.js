const jwtUtils = require("../utils/auth/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  statusCodes,
  sendResponse,
  sendError,
  errorMessages,
} = require("../utils/responses");
const { deleteFile } = require("../utils/fileSystem");
const uploadObj = require("../middlewares/avatarImageUpload");


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
        errorMessages.invalidAuth,
        statusCodes.error.invalidData
      );
    }

    return sendResponse(
      res,
      createTokenResponse(user),
      statusCodes.success.ok
    );

  } catch (error) {
    return sendError(
      res,
      errorMessages.invalidAuth,
      statusCodes.error.invalidData
    );
  }
}


const register = async (req, res) => {


  const upload = uploadObj.single("avatar");

  upload(req, res, async (err) => {

    if (err) {
      return sendError(
        res,
        errorMessages.invalidMediaType,
        statusCodes.error.invalidMediaType
      );
    }

    const newUser = req.body;

    if (typeof (req.body) !== "object") newUser = JSON.parse(req.body);

    let avatar = "public/images/avatars/default.png";

    // check if image exists
    if (req.file) {
      avatar = req.file.destination + req.file.filename;
    }

    //create user
    try {
      const user = await User.create({ ...newUser, avatar });
      return sendResponse(
        res,
        createTokenResponse(user),
        statusCodes.success.created
      );
    } catch (error) {

      // remove the avatar from server
      deleteFile(avatar);

      return sendError(res, error.message, statusCodes.error.invalidData);
    };

  });

}


// create user token and return the response
const createTokenResponse = (user) => {

  const jwt = jwtUtils.issueJWT(user);

  // remove password from the user
  delete user._doc.password;

  return { user, token: jwt.token, expiresIn: jwt.expiresIn };
}


module.exports = { login, register };