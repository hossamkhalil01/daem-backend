const ENV = require("./utils/env");

const config = {
  dev: {
    DB_URI: ENV.getVar("MONGODB_URI") || "mongodb://db:27017/daem",
    PORT: ENV.getVar("PORT") || 8000,
  },

  prod: {},
};

module.exports = config;