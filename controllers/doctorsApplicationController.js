const Application = require("../models/doctorApplication");
const User = require("../models/user");
const ROLES = require("../utils/roles");

const { extractPaginationInfo } = require("../utils/pagination");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");

const uploadObject = require("../middlewares/uploads/applicationImagesUpload");
const { removeDir } = require("../utils/fileSystem");
const SPECIALITIES_LIST = require("../utils/specialities");

const removeApplicationImagesDir = (userId) => {

  const APP_IMAGES_BASE = "public/images/doctor_applications/";

  // remove the application images dir
  return removeDir(APP_IMAGES_BASE + userId);
};

const getSpecialities = (req, res) => {
  return sendResponse(res, SPECIALITIES_LIST, statusCodes.success.ok);
}

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

  const upload = uploadObject.array("images", 2);

  upload(req, res, async function (err) {
    if (err) {
      return sendError(
        res,
        errorMessages.invalidMediaType,
        statusCodes.error.invalidMediaType
      );
    }

    const { about, speciality } = req.body;

    const newData = {
      about, speciality, applicant: req.user._id,
    };

    if (req.files) {
      const nationalId = req.files[0];
      const doctorId = req.files[1];

      nationalId ? newData.nationalId = nationalId.path : '';
      doctorId ? newData.doctorId = doctorId.path : '';
    }

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
    return { updatedApplication, error: false };
  } catch (error) {
    // invalid params
    return { updatedApplication: {}, error };
  }
}

const userToDoctor = async (application, res) => {

  // construct doctor info object
  const doctorInfo = {
    speciality: application.speciality,
    about: application.about,
  };

  // construct updates object
  const updates = {
    doctorInfo,
    role: ROLES.doc,
  }

  try {
    const updatedUser = await User.findOneAndUpdate({ _id: application.applicant }, updates, {
      new: true,
      runValidators: true,
    });

    // user not found
    if (!updatedUser)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);

    // updated
    return { updatedUser, error: false };

  } catch (error) {
    // invalid params
    return { updatedUser: {}, error };
  }
}

const approveApplication = async (req, res) => {
  const id = req.params.id;


  //update application
  const { updatedApplication, error } = await updateApplicationStatus(res, id, "approved");

  // error occured
  if (error)
    return sendError(res, error.message, statusCodes.error.invalidData);


  // change user to doctor
  const updatedUser = userToDoctor(updatedApplication, res);

  if (!error)
    return sendResponse(res, updatedApplication, statusCodes.success.ok);

  return sendError(res, error.message, statusCodes.error.serverError);
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
  getSpecialities
};
