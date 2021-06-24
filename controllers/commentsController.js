const Comment = require("../models/comment");
const { extractPaginationInfo } = require("../utils/pagination");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");

const getComments = async (req, res) => {
  // process the query params
  const [{ limit, page }, filter] = extractPaginationInfo(req.query);

  // the pagination options
  const options = {
    sort: { _id: -1 },
    populate: ["author", "ticket"],
    page,
    limit,
  };
 try {
   const comments = await Comment.find(filter,options);
   return sendResponse(res,comments,statusCodes.success.ok);
 } catch (error) {
   return sendError(res, error.message, statusCodes.error.invalidData);
 }
};

const getComment = (req, res) => {
  res.send("getComment works");
};

const createComment = (req, res) => {
  res.send("createComment works");
};

const updateComment = (req, res) => {
  res.send("updateComment works");
};

const deleteComment = (req, res) => {
  res.send("deleteComment works");
};

module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
