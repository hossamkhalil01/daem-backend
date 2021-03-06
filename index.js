const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ENV = require("./utils/env");
const passport = require("passport");
const passportUtils = require("./utils/auth/passport");
const configs = require("./configs");
const app = express();
const http = require("http");

// get the enviornment configs
const curr_env = ENV.getVar("NODE_ENV") || "dev";
const { DB_URI, PORT } = configs[curr_env];

// connect to DB
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to mongodb");
    server.listen(PORT, (err) => {
      if (err) return console.log(err);
      return console.log("Server started on port: " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });


const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methode: "*",
  },
});


let sockets= {};

global.io = io; //added
global.sockets = sockets;

module.exports = sockets;
io.on("connection", (socket) => {
  socket.on("authenticated", (userId) => {
    sockets[socket.id] = userId;
  });
  socket.on("disconnect", function () {
    delete sockets[socket.id];
  });
});



/* Middlewares */
app.use(express.json());
app.use(cors());

// static files middleware
app.use("/public", express.static("public/"));

// auth middleware
passportUtils.createStrategy(passport);
app.use(passport.initialize());

// add resources routers
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/tickets", require("./routes/tickets"));
app.use("/notifications", require("./routes/notifications"));
app.use("/doctors", require("./routes/doctors"));
app.use("/health", require("./routes/health"));
app.use("/", require("./routes/general"));
app.use("/articles", require("./routes/articles"));
app.use("/doctor-applications", require("./routes/doctorApplications"));