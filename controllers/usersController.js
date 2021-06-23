const User = require("../models/user");
const { extractPaginationInfo } = require("../utils/pagination");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");
const { deleteFile } = require("../utils/fileSystem");
const uploadObj = require("../middlewares/avatarImageUpload");


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
    return true;

  } catch (error) {
    // invalid params
    return false;
  }
}

const updateUserRole = (req, res) => {

  const id = req.params.id;
  const updates = { role: req.body.role };

  //update user
  if (updateUser(req, res, id, updates))
    return sendResponse(res, updatedUser, statusCodes.success.ok);

  // error occured
  return sendError(res, error.message, statusCodes.error.invalidData);

};

const updateCurrentUser = (req, res) => {

  const upload = uploadObj.single("avatar");

  upload(req, res, async (err) => {

    if (err) {
      return sendError(
        res,
        errorMessages.invalidMediaType,
        statusCodes.error.invalidMediaType
      );
    }

    const id = req.user._id;
    let updates = req.body;

    if (typeof (req.body) !== "object") updates = JSON.parse(req.body);

    // check if image exists
    if (req.file) {
      updates.avatar = req.file.destination + req.file.filename;
    }

    // update user
    if (updateUser(req, res, id, updates))
      return sendResponse(res, updatedUser, statusCodes.success.ok);


    // error occured

    // delete the image if uploaded
    updates.avatar ? deleteFile(updates.avatar) : '';

    return sendError(res, error.message, statusCodes.error.invalidData);
  });

}


module.exports = {
  getUsers,
  getUser,
  updateUserRole,
  updateCurrentUser
};
