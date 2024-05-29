const User = require("../models/Users");

async function checkUser(req, res, next) {
  const { username, email } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    req.User = user;
    next();
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Some Error Occured!", status: false });
  }
}
module.exports = checkUser;
