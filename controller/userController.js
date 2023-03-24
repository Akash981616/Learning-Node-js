const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
//register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, roles } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  const userExists = await User.findOne({ email }).exec();
  if (userExists) {
    res.status(409); //conflict
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name: name,
    email: email,
    password: hashedPassword,
    pic: pic,
    roles: roles,
    refreshToken: generateToken({
      UserInfo: {
        name: name,
        roles: roles,
      },
    }),
  };
  const user = await User.create(newUser);

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//User Authenticate
const AuthenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
  }
  const user = await User.findOne({ email }).exec();
  console.log(user);
  if (!user) res.status(401).json("User Not Found");
  const match = await bcrypt.compare(password, user.password);

  if (match) {
    const roles = Object.values(user.roles);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      img: user.img,
      accessToken: generateToken({
        UserInfo: {
          name: user.name,
          roles: roles,
        },
      }),
    });
    res.json(user).status(200);
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//search User
const searchUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.send(users).status(200);
});
module.exports = { registerUser, AuthenticateUser, searchUser };
