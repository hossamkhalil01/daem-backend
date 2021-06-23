const User = require("../models/user");
const { extractPaginationInfo } = require("../utils/pagination");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");


const getUsers = async (req, res) => {
  // process the query params
  const [{ limit, page }, filter] = extractPaginationInfo(req.query);

  // the pagination options
  const options = {
    select: 'firstname lastname email avatar role',
    sort: { _id: -1 },
    page,
    limit,
  };

  try {
    // get the users
    const users = await User.paginate(filter, options);
    // build the resulting object
    return sendResponse(res, users, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const getUser = async (req, res) => {

  const id = req.params.id;

  try {
    const user = await User.findOne({ _id: id }).select("-password");
    // user not found
    if (!user)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    return sendResponse(res, user, statusCodes.success.ok);
  } catch (error) {
    return sendError(
      res,
      errorMessages.notFound,
      statusCodes.error.invalidData
    );
  }
};

const updateUser = async (req, res, id, updates) => {

  try {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, updates, {
      new: true,
      runValidators: true,
    });

    // user not found
    if (!updatedUser)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // updated
    return sendResponse(res, updatedUser, statusCodes.success.ok);

  } catch (error) {
    // invalid params
    return sendError(res, error.message, statusCodes.error.invalidData);
  }

}

const updateUserRole = (req, res) => {

  const id = req.params.id;
  const updates = { role: req.body.role };

  return updateUser(req, res, id, updates)
};

const updateCurrentUser = (req, res) => {

  const id = req.user._id;
  const updates = req.body;

  if (req.file) {
    avatar = req.file.destination + req.file.filename;
    updates.avatar = avatar;
  }

  return updateUser(req, res, id, updates)
}


module.exports = {
  getUsers,
  getUser,
  updateUserRole,
  updateCurrentUser
};
