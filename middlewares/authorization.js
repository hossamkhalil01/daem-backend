const { statusCodes, sendError, errorMessages } = require("../utils/responses");
const ROLES = require("../utils/roles");

const authorize = (userRole, role, res, next) => {
  if (userRole !== role)
    return sendError(
      res,
      errorMessages.unAuthorized,
      statusCodes.error.unAuthorized
    );
  return next();
};

const isModerator = (req, res, next) =>
  authorize(req.user.role, ROLES.mod, res, next);

const isDoctor = (req, res, next) =>
  authorize(req.user.role, ROLES.doc, res, next);

const isUser = (req, res, next) => {
  console.log(req.user);
  return authorize(req.user.role, ROLES.user, res, next);
};

module.exports = { isModerator, isDoctor, isUser };
