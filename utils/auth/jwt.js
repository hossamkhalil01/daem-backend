const jwt = require("jsonwebtoken");
const ENV = require("../env");

const defaultExpiration = "30d";
const secret = ENV.getVar("SECRETKEY");


// create jwt object
const issueJWT = (user) => {


  const expiresIn = ENV.getVar("AUTH_EXPIRATION") || defaultExpiration;
  const userId = user._id

  const payload = {
    sub: userId,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, secret, {
    expiresIn,
    algorithm: "HS256",
  });

  return {
    token: "Bearer " + signedToken,
    expiresIn,
  };
}

module.exports = { issueJWT };