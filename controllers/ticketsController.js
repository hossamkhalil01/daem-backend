const Ticket = require("../models/ticket");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");

const getTickets = (req, res) => {
  res.send("it works");
};

const getTicket = (req, res) => {
  res.send("getTicket works");
};

const createTicket = (req, res) => {
  res.send("createTicket works");
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
  removeTicketDoctor
};
