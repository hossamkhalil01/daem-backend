const User = require("../models/user");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");


const getDoctors = async (req, res) => {
  // process the query params
  const [{ limit, page }, filter] = extractPaginationInfo(req.query);

  // the pagination options
  const options = {
    select: '-password -role',
    sort: { _id: -1 },
    page,
    limit,
  };

  try {
    // get the users
    const users = await User.paginate({ ...filter, role: "doctor" }, options);
    // build the resulting object
    return sendResponse(res, users, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

module.exports = {
  getDoctors,
};
