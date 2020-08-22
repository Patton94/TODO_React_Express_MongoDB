const jwt = require("jsonwebtoken");
require("dotenv/config");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check for token

  if (!token) return res.json({ msg: "No token authorization denied" });

  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.jwtSecret);

    // add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.json({ msg: "Invalid token" });
  }
};

module.exports = auth;
