const Article = require("../models/article");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");
const { extractPaginationInfo } = require("../utils/pagination");
const uploadObject = require("../middlewares/ticketImagesUpload");
const { deleteFile } = require("../utils/fileSystem");

const getArticles = async (req, res) => {
  const [{ limit, page }, filter] = extractPaginationInfo(req.query);
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
    const article = await Article.findOne({ _id: req.params.id }).populate(
      "author"
    );
    if (!article)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);
    return sendResponse(res, article, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const createArticle = async (req, res) => {
  const upload = uploadObject.single("image");
  upload(req, res, async function (err) {
    if (err) {
      return sendError(
        res,
        errorMessages.invalidMediaType,
        statusCodes.error.invalidMediaType
      );
    }
    let newArticle = req.body;
    if (typeof req.body !== "object") newArticle = JSON.parse(req.body);
    newArticle.image = req.file.destination + req.file.filename;
    try {
      const article = await Article.create({ ...newArticle });
      return sendResponse(
        res,
        createTokenResponse(article),
        statusCodes.success.created
      );
    } catch (error) {
      newArticle.image ? deleteFile(newArticle.image) : "";
      return sendError(res, error.message, statusCodes.error.invalidData);
    }
  });
};

const updateArticle = async (req, res) => {
  const upload = uploadObj.single("image");
  const id = req.params.id;
  upload(req, res, async (err) => {
    if (err) {
      return sendError(
        res,
        errorMessages.invalidMediaType,
        statusCodes.error.invalidMediaType
      );
    }

    let updates = req.body;
    if (typeof req.body !== "object") updates = JSON.parse(req.body);
    if (req.file) {
      updates.image = req.file.destination + req.file.filename;
    }
    const updatedArticle = await Ticket.findOneAndUpdate({ _id: id }, updates, {
      new: true,
      runValidators: true,
    });
    if (updatedArticle)
      return sendResponse(res, updatedArticle, statusCodes.success.ok);
    updates.image ? deleteFile(updates.image) : "";
    return sendError(res, error.message, statusCodes.error.invalidData);
  });
};

const deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedArticle)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);
    deleteFile(deletedArticle.image);
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
