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

const updateTicket = (req, res) => {
  res.send("updateTicket works");
};

const deleteTicket = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const ticket = await Ticket.findOneAndDelete({ _id: id });
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
};
