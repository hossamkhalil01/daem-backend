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

module.exports = { getTickets };
