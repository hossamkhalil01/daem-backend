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

const createTicket = (req, res) => {
  res.send("createTicket works");
};

const updateTicket = (req, res) => {
  res.send("updateTicket works");
};

const deleteTicket = (req, res) => {
  res.send("deleteTicket works");
};

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};