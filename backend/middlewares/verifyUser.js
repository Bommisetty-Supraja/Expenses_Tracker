const jwt = require("jsonwebtoken");

function verifyUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const user = jwt.verify(token, process.env.SECRET_KEY);
  req.user_id = user.user_id;
  next();
}

module.exports = verifyUser;
