const User = require("../models/user");
const Ticket = require("../models/ticket");
const Notification = require("../models/notification");
const { extractPaginationInfo } = require("../utils/pagination");
const {
  statusCodes,
  sendError,
  sendResponse,
  errorMessages,
} = require("../utils/responses");

const getNotifications = async (req, res) => {
  const [{ limit, page }, filter] = extractPaginationInfo(req.query);
  const options = {
    sort: { createdAt: -1 },
    page,
    limit,
  };
  try {
    const notifications = await Notification.paginate(filter, options);
    return sendResponse(res, notifications, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};

const setReadNotifications = async (req, res) => {
  const notifications = req.body;
  try {
    const updatednotifications = await Notification.updateMany(
      { _id: { $in: notifications } }, 
      {read : true},
      {
        runValidators: true,
      }
    );
    if (!updatednotifications)
      return sendError(res, errorMessages.notFound, statusCodes.error.notFound);
    return sendResponse(res, updatednotifications, statusCodes.success.ok);
  } catch (error) {
    return sendError(res, error.message, statusCodes.error.invalidData);
  }
};


const newCommentNotification = async ({ authorId, ticketId }) => {
  try {
    const author = await User.findOne({ _id: authorId });
    const ticket = await Ticket.findOne({ _id: ticketId }).populate("patient");
    const params = {
      action: "comment",
      ticket: ticketId,
      recipient: ticket.patient._id,
      actor: `Dr. ${author.firstname} ${author.lastname}`
      };
    const notification = await Notification.create(params);
    const socketIds = Object.keys(global.sockets);
    socketIds.forEach((socketId) => {
      if (sockets[socketId] == params.recipient){
        {io.to(socketId).emit("newNotification", notification);
      }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const newApplicationNotification = async ({recipient,appStatus}) => {
  try {
    const params = {
      recipient : recipient,
      action: "application",
      appStatus: appStatus
      };
    const notification = await Notification.create(params);
    const socketIds = Object.keys(global.sockets);
    socketIds.forEach((socketId) => {
      if (sockets[socketId] == params.recipient){
        io.to(socketId).emit("newNotification", notification);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  newCommentNotification,
  getNotifications,
  setReadNotifications,
  newApplicationNotification
};
