const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const zod = require("zod");
const checkUser = require("../middlewares/checkUser");

// SignUp Route
Router.route("/register").post(checkUser, async (req, res) => {
  // Check if the user exists
  if (req.User) {
    return res
      .status(403)
      .send({ message: "User already exists!", status: false });
  }
  try {
    const { username, email, password, gender } = req.body;
    const hashPassword = await bcrypt.hash(password, 8);
    const newUser = await new User({
      email,
      username,
      gender,
      password: hashPassword,
    }).save();
    const token = jwt.sign(
      { user_id: newUser._id, username: newUser.username },
      process.env.SECRET_KEY
    );
    return res.status(200).send({
      msg: "User Created Successfully",
      token,
      user: newUser,
      status: true,
    });
  } catch (err) {
    return res.status(500).send({
      message:
        err?.issues?.map((ele) => ele.message).join(" & ") || err?.message,
      status: false,
    });
  }
});

// Login Route
Router.route("/login").post(checkUser, async (req, res) => {
  // Check if the user exists
  if (!req.User) {
    return res.status(404).send({ message: "User not found!", status: false });
  }
  //   If they exists
  try {
    const { username, password } = req.body;
    const isCorrectPassword = await bcrypt.compare(password, req.User.password);
    if (!isCorrectPassword) {
      return res
        .status(401)
        .send({ message: "Please check your credentials!", status: false });
    }
    const user_id = req.User._id;
    const token = jwt.sign({ user_id, username }, process.env.SECRET_KEY);
    return res.send({
      msg: "Logged In Successfully",
      token,
      user: req.User,
      status: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Some Error Occured!",
      status: false,
    });
  }
});

module.exports = Router;
