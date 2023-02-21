const express = require("express");
const {
  registerUser,
  AuthenticateUser,
  searchUser,
} = require("../controller/userController");
const router = express.Router();
router.route("/").get(searchUser).post(registerUser);
router.route("/authenticate").post(AuthenticateUser);
module.exports = router;
