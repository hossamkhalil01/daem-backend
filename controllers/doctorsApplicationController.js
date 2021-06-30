const Application = require("../models/doctorApplication");
const { extractPaginationInfo } = require("../utils/pagination");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");

const uploadObject = require("../middlewares/uploads/applicationImagesUpload");
const { removeDir } = require("../utils/fileSystem");

const APP_IMAGES_BASE = "public/images/doctor_applications/";


const removeApplicationImagesDir = async (userId) => {
  // remove the application images dir
  return removeDir(`APP_IMAGES_BASE+${userId}`);
};

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

  const upload = uploadObject.fields([{
    name: 'nationalId', maxCount: 1
  }, {
    name: 'doctorId', maxCount: 1
  }]);

  upload(req, res, async function (err) {
    if (err) {
      return sendError(
        res,
        errorMessages.invalidMediaType,
        statusCodes.error.invalidMediaType
      );
    }
    // catch the images
    const nationalId = req.files.nationalId[0];
    const doctorId = req.files.doctorId[0];

    const newData = {
      ...req.body, applicant: req.user._id,
      nationalId: nationalId.path,
      doctorId: doctorId.path,
    };

    try {
      const newApplication = await Application.create(newData);
      return sendResponse(res, newApplication, statusCodes.success.created);
    } catch (error) {

      // remove the application images dir
      removeApplicationImagesDir(req.user._id);

      return sendError(res, error.message, statusCodes.error.invalidData);
    }
  });
}

const updateApplicationStatus = async (res, applicationId, newStatus) => {
  try {
    const updatedApplication = await Application.findOneAndUpdate({ _id: id }, {
      status: newStatus
    }, {
      new: true,
      runValidators: true,
    });

    // application not found
    if (!updatedApplication)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // updated
    return updatedApplication;
  } catch (error) {
    // invalid params
    return false;
  }
}

const approveApplication = async (req, res) => {
  const id = req.params.id;


  //update application
  const updatedApplication = await updateApplicationStatus(res, id, "approved");

  if (updatedApplication)
    return sendResponse(res, updatedApplication, statusCodes.success.ok);

  // error occured
  return sendError(res, error.message, statusCodes.error.invalidData);
}

const rejectApplication = async (req, res) => {

  const id = req.params.id;
  try {
    const application = await Application.findOneAndDelete({ _id: id });
    // not found
    if (!application)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // remove the application images dir
    removeApplicationImagesDir(req.user._id);

    return sendResponse(res, application, statusCodes.success.noContent);

  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }

}


module.exports = {
  getAllApplications,
  getApplication,
  createApplication,
  approveApplication,
  rejectApplication,
};
