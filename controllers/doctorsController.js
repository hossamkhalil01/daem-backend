const User = require("../models/user");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");
const ROLES = require("../utils/roles")
const { extractPaginationInfo } = require("../utils/pagination");


const getDoctors = async (req, res) => {
  // process the query params
  const [{ limit, page }, filter] = extractPaginationInfo(req.query);

  // the pagination options
  const options = {
    select: '-password -role -diseases',
    sort: { _id: -1 },
    page,
    limit,
  };

  try {
    // get the doctors
    const doctors = await User.paginate({ ...filter, role: "doctor" }, options);
    // build the resulting object
    return sendResponse(res, doctors, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const getDoctor = async (req, res) => {

  const id = req.params.id;

  try {
    const doctor = await User.findOne({ _id: id }).select("-diseases -password -email ");
    // doctor not found
    if (!doctor || doctor.role !== ROLES.doc)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    return sendResponse(res, doctor, statusCodes.success.ok);
  } catch (error) {
    return sendError(
      res,
      errorMessages.notFound,
      statusCodes.error.invalidData
    );
  }
}

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({role:"doctor"}).select('_id firstname lastname');;
    return sendResponse(res, doctors, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

module.exports = {
  getAllDoctors,
  getDoctors,
  getDoctor
};
