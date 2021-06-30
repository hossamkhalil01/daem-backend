const Ticket = require("../models/ticket");
const { extractPaginationInfo } = require("../utils/pagination");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");

const uploadObject = require("../middlewares/ticketImagesUpload");
const { deleteFile } = require("../utils/fileSystem");
const MAX_TICKETS_PER_DAY = 1;

const getTickets = async (req, res) => {
  // process the query params
  const [{ limit, page }, filter] = extractPaginationInfo(req.query);

  // the pagination options
  const options = {
    sort: { _id: -1 },
    populate: ["patient", "doctor"],
    page,
    limit,
  };

  try {
    // get the tickets
    let newFilter = filter;
    if (req.user.role == "user") {
      newFilter = { ...filter, patient: req.user._id };
    }
    const tickets = await Ticket.paginate(newFilter, options);

    // build the resulting object
    return sendResponse(res, tickets, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const getTicket = async (req, res) => {
  const id = req.params.id;
  try {
    const ticket = await Ticket.findOne({ _id: id })
      .populate("patient", "firstname lastname gender DOB")
      .populate("doctor", "firstname lastname");
    if (!ticket)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);
    return sendResponse(res, ticket, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const createTicket = async (req, res) => {
  const upload = uploadObject.array("images", 5);

  upload(req, res, async function (err) {
    if (err) {
      return sendError(
        res,
        errorMessages.invalidMediaType,
        statusCodes.error.invalidMediaType
      );
    }
    const newData = { ...req.body, patient: req.user._id, images: [] };
    if (req.files) {
      const imagesPaths = req.files.map(({ path }) => path);
      newData.images = imagesPaths;
    }
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const ticketsCreatedToday= await Ticket.find({createdAt: {$gte: today},patient: req.user._id});
    if(ticketsCreatedToday.length === MAX_TICKETS_PER_DAY){
      return sendResponse(res, errorMessages.exceededLimit, statusCodes.error.unAuthorized);
    }
    try {
      const newTicket = await Ticket.create(newData);
      return sendResponse(res, newTicket, statusCodes.success.created);
    } catch (error) {
      imagesPaths.forEach((element) => {
        deleteFile(element);
      });
      return sendError(res, error.message, statusCodes.error.invalidData);
    }
  });
};

const updateTicket = async (req, res) => {
  const id = req.params.id;

  const upload = uploadObject.array("images", 5);

  upload(req, res, async function (err) {
    if (err) {
      return sendError(
        res,
        errorMessages.invalidMediaType,
        statusCodes.error.invalidMediaType
      );
    }
    const updates = { ...req.body };
    if (req.files) {
      const imagesPaths = req.files.map(({ path }) => path);
      updates.images = imagesPaths;
    }

    try {
      const updatedTicket = await Ticket.findOneAndUpdate(
        { _id: id },
        updates,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedTicket)
        return sendError(
          res,
          errorMessages.notFound,
          statusCodes.error.notFound
        );
      return sendResponse(res, updatedTicket, statusCodes.success.ok);
    } catch (error) {
      return sendError(res, error.message, statusCodes.error.invalidData);
    }
  });
};

const deleteTicket = async (req, res) => {
  const id = req.params.id;
  try {
    const ticket = await Ticket.findOneAndDelete({ _id: id });
    if (!ticket)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);
    return sendResponse(res, ticket, statusCodes.success.noContent);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const removeTicketDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const ticket = await Ticket.findOne({ _id: id }, function (err, _ticket) {
      _ticket.doctor = undefined;
      _ticket.save();
    });
    if (!ticket)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);
    return sendResponse(res, ticket, statusCodes.success.noContent);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  removeTicketDoctor,
};
