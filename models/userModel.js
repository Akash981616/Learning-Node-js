const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  email: { type: "String", unique: true, required: true },
  password: {
    type: String,
    required: true,
  },
  
  refreshToken: String,
  img: {
    type: "String",
    required: true,
    default: "https://images2.alphacoders.com/867/867818.jpg",
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
