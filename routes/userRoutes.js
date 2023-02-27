const express = require("express");
const {
  registerUser,
  AuthenticateUser,
  searchUser,
} = require("../controller/userController");
const verfifyAuth = require("../middleware/verifyAuth");
const router = express.Router();
router.route("/").get(verfifyAuth, searchUser).post(registerUser);
router.route("/authenticate").post(verfifyAuth, AuthenticateUser);
module.exports = router;
