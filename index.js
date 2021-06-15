
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ENV = require("./utils/env");
const passport = require("passport");
const passportUtils = require("./utils/auth/passport");
const configs = require("./configs");


const app = express();


// get the enviornment configs
const curr_env = ENV.getVar("NODE_ENV") || "dev";
const { DB_URI, PORT } = configs[curr_env];

// connect to DB
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to mongodb");
    app.listen(PORT, (err) => {
      if (err) return console.log(err);

      return console.log("Server started on port: " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// add middlewares
app.use(express.json());
app.use(cors());

// add auth middleware
passportUtils.createStrategy(passport);
app.use(passport.initialize());

// add resources routers
app.use("/auth", require("./routes/auth"));
app.use("/tickets", require("./routes/tickets"));
