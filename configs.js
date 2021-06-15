require("dotenv").config();

const config = {
  dev: {
    DB_URI: process.env.MONGODB_URI || "mongodb://db:27017/daem",

    PORT: process.env.PORT || 8000,
  },

  prod: {},
};

module.exports = config;