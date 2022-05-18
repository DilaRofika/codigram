const { tokenVerifier } = require("../helpers/jsonwebtoken");

const authentication = (req, res, next) => {
  const accessToken = req.headers.accesstoken;

  if (accessToken) {
    try {
      const result = tokenVerifier(accessToken);
      req.userData = result;
      next();
    } catch (err) {
      res.status(401).json({ message: "Token invalid" });
    }
  } else {
    res.status(404).json({ message: "Token not found" });
  }
};

module.exports = { authentication };