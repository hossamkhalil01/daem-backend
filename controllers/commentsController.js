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

const createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    return sendResponse(res,comment,statusCodes.success.created);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findOneAndUpdate({_id:req.params.id},req.body,{
      new: true,
      runValidators: true
    });
    if(!updatedComment) return sendError(res,errorMessages.notFound,statusCodes.error.notFound);
    return sendResponse(res,updatedComment,statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
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
