const bcrypt = require("bcrypt");

const passwordHash = async function (next) {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
};

module.exports = passwordHash;