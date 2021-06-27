const Article = require("../models/article");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");
const { extractPaginationInfo } = require("../utils/pagination");

const getArticles = async (req, res) => {
  const [{ limit, page }, filter] = extractPaginationInfo(req.query);
  console.log(filter);
  const options = {
    sort: { createdAt: -1 },
    populate: [{ path: "author", select: "firstname lastname avatar role" }],
    page,
    limit,
  };
  try {
    const articles = await Article.paginate(filter, options);
    return sendResponse(res, articles, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};


const getArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id }).populate("author");
    console.log(article);
    if (!article)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);
    return sendResponse(res, article, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    return sendResponse(res, article, statusCodes.success.created);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const updateArticle = async (req, res) => {
  try {
    const updatedArticle = await Article.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedArticle)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);
    return sendResponse(res, updatedArticle, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedArticle)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);
    return sendResponse(res, deletedArticle, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

module.exports = {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};
