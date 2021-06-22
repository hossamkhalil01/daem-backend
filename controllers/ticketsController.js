const Ticket = require("../models/ticket");
const { extractPaginationInfo } = require("../utils/pagination");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");

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
    const tickets = await Ticket.paginate(filter, options);
    // build the resulting object
    return sendResponse(res, tickets, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const getTicket = (req, res) => {
  res.send("getTicket works");
};

const createTicket = async (req, res) => {
  const imagesPaths = req.files.map(({path}) => path);
  try {
    const newTicket = await Ticket.create(
      { ...req.body, patient : '60d13143e7f421d412434436', images: imagesPaths });

    return sendResponse(res, newTicket, statusCodes.success.created);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }

};

const updateTicket = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTicket = await Ticket.findOneAndUpdate(
      { _id: id },
      req.body.updates,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedTicket)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);
    return sendResponse(res, updatedTicket, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
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
