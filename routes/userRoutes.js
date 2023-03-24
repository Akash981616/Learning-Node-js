const express = require("express");
const {
  registerUser,
  AuthenticateUser,
  searchUser,
} = require("../controller/userController");
const verifyRoles = require("../controller/verifyRoles");
const verfifyAuth = require("../middleware/verifyAuth");
const router = express.Router();
router
  .route("/")
  .get(verfifyAuth, verifyRoles(1999, 2002), searchUser)
  .post(registerUser);
router.route("/authenticate").post(AuthenticateUser);
router.route("refreshToken")
module.exports = router;
