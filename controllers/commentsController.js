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

const getComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({_id:req.params.id}).populate("author ticket");
    if(!comment) return sendError(res,errorMessages.notFound,statusCodes.error.notFound);
    return sendResponse(res,comment,statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
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
