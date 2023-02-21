const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: { type: "String", required: true },
  email: { type: "String", unique: true, required: true },
  password: { type: "String", required: true },
  img: {
    type: "String",
    required: true,
    default: "https://images2.alphacoders.com/867/867818.jpg",
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
