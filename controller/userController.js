const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});
const AuthenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).json("User Not Found");
  }
  const user = await User.findOne({ email });
  console.log(user);
  if (user && user.password == password) {
    res
      .json({ id: user._id, name: user.name, email: user.email, img: user.img })
      .status(200);
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
const searchUser = asyncHandler(async (req, res) => {
  console.log(req.query);
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find();
  // .find({ _id: { $ne: req.user._id } });
  res.send(users);
});
module.exports = { registerUser, AuthenticateUser, searchUser };
