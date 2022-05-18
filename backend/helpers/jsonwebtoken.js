const jwt = require("jsonwebtoken");

const saltRoundd = process.env.saltRoundd || "test";

const getJwt = (data) => {
  const { id, email, username, nama } = data;
  return jwt.sign({ id, email, username, nama }, saltRoundd, {
    expiresIn: "1h",
  });
};

const getVerification = (data) => {
  return jwt.verify(data, saltRoundd);
};

module.exports = { getJwt, getVerification };