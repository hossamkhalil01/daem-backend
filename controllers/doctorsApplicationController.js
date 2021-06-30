const Application = require("../models/doctorApplication");
const { extractPaginationInfo } = require("../utils/pagination");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");

const uploadObject = require("../middlewares/uploads/applicationImagesUpload");
const { deleteFile } = require("../utils/fileSystem");


const getAllApplications = async (req, res) => {
  // process the query params
  const [{ limit, page }, filter] = extractPaginationInfo(req.query);

  // the pagination options
  const options = {
    sort: { _id: -1 },
    populate: [{ path: "applicant", select: "-password -diseases -role" }],
    page,
    limit,
  };

  try {
    // get applications
    const applications = await Application.paginate(filter, options);

    // build the resulting object
    return sendResponse(res, applications, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
}

const getApplication = async (req, res) => {

  const id = req.params.id;
  try {
    const application = await Application.findOne({ _id: id })
      .populate("applicant", "-password -diseases -role")
    if (!application)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);
    return sendResponse(res, application, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
}

const createApplication = async (req, res) => {

}

const approveApplication = async (req, res) => {

}

const declineApplication = async (req, res) => {

}


module.exports = {
  getAllApplications,
  getApplication,
  createApplication,
  approveApplication,
  declineApplication,
};
