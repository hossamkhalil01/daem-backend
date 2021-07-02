const Comment = require("../models/comment");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");
const { extractPaginationInfo } = require("../utils/pagination");
const notificationsController = require("../controllers/notificationsController");
const getComments = async (req, res) => {
  const [{ limit, page }, filter] = extractPaginationInfo(req.query);
  filter["ticket"] = req.params.ticketId;
  const options = {
    sort: { createdAt: -1 },
    populate: [{ path: "author", select: "firstname lastname avatar" }],
    page,
    limit,
  };
  try {
    const comments = await Comment.paginate(filter, options);
    return sendResponse(res, comments, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const getComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id }).populate(
      "author ticket"
    );
    if (!comment)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);
    return sendResponse(res, comment, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const createComment = async (req, res) => {
  try {
    let comment = await Comment.create(req.body);
    comment = await comment
      .populate("author", "firstname lastname avatar role")
      .execPopulate();
    if (comment.author.role === "doctor")
      await notificationsController.newCommentNotification({
        authorId: comment.author,
        ticketId: comment.ticket,
      });
    return sendResponse(res, comment, statusCodes.success.created);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedComment)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);
    return sendResponse(res, updatedComment, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedComment)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);
    return sendResponse(res, deletedComment, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
