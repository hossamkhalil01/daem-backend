const express = require("express");
const ticketsController = require("../controllers/ticketsController");
const { isDoctor } = require("../middlewares/authorization");
const passport = require("passport");

const multer = require('multer');
// init router
const Router = express.Router();

const commentsRouter = require("./comments");

Router.use("/:ticketId/comments", commentsRouter);


// save images to public folder using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "public/images/tickets");
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, Date.now() + '-daem-' + fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
});


/** 
GET 
Route: / 
Results: All Tickets
**/
Router.get(
  "/",
  [passport.authenticate("jwt", { session: false }), isDoctor],
  ticketsController.getTickets
);

/** 
GET 
Route: /id 
Results: get Ticket
**/
Router.get("/:id", ticketsController.getTicket);

/** 
Ticket 
Route: / 
Results: create Ticket
**/
Router.post("/", upload.array("images", 5),  ticketsController.createTicket);

/** 
PUT
Route: /id 
Results: update Ticket
**/
Router.patch("/:id", ticketsController.updateTicket);

/** 
DELETE 
Route: / 
Results: delete Tickets
**/
Router.delete("/:id", ticketsController.deleteTicket);

/** 
DELETE 
Route: / 
Results: delete Tickets
**/
Router.delete("/:id/remove-doctor", ticketsController.removeTicketDoctor);

module.exports = Router;
