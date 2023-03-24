const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../config/generateToken");
const { JsonWebTokenError } = require("jsonwebtoken");
//register User

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
    const refreshToken = generateToken({ user }, "fasdfas", {
      expiresIn: "7d",
    });
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
    res.status(201).json({ refreshToken });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});
const refreshToken = asyncHandler(async (req, res) => {
 
 const cookie = req.cookies;
 if(!cookie?.jwt) return res.status(401).json({message:"Unauthorized"})
 const refreshTkn = cookie.jwt
 jwt.verify(refreshTkn, "fasdfas",asyncHandler(async(err,decoded)=>{
  if(err) res.status(403).json({message :"Forbidden"});
  const foundUser = await User.findOne({email :decoded.email})
  if(!foundUser)res.status(401).json({ message: "Unauthorized" });
   const refreshToken = generateToken({ user }, "fasdfas", {
     expiresIn: "7d",
   });
   res.status(201).json({ refreshToken });
 }));
 
});
//search User
const searchUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.send(users).status(200);
});
const logOut = asyncHandler(async (req, res) => {
  
 const cookie = req.cookies;
 if (!cookie?.jwt) return res.status(401).json({ message: "Unauthorized" });
 res.clearCookie("jwt", {
   httpOnly: true, //accessible only by web server
   secure: true, //https
   sameSite: "None", //cross-site cookie
   maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
 });
  res.status(200).json({message:"Logout Succesfully" });
});
module.exports = { registerUser, AuthenticateUser, searchUser, refreshToken };
