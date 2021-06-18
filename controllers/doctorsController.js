const User = require("../models/user");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");


const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({role:"doctor"}).select('_id firstname lastname');;
    console.log(doctors);
    return sendResponse(res, doctors, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

module.exports = {
  getDoctors,
};
