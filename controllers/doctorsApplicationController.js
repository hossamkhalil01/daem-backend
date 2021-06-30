const Application = require("../models/doctorApplication");
const { extractPaginationInfo } = require("../utils/pagination");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");

const uploadObject = require("../middlewares/uploads/ticketImagesUpload");
const { deleteFile } = require("../utils/fileSystem");


const getAllApplications = async (req, res) => {

}

const getApplication = async (req, res) => {

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
