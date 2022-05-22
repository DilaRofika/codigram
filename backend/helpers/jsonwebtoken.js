const jwt = require("jsonwebtoken");
const saltRoundd = process.env.saltRoundd || "test";

const tokenGenerator = (data) => {
  const { id, username, email, image, age } = data;
  return jwt.sign({ id, username, email, image, age }, saltRoundd, {
    expiresIn: "1h",
  });
};

const tokenVerifier = (data) => {
  return jwt.verify(data, saltRoundd);
};

module.exports = { tokenGenerator, tokenVerifier };