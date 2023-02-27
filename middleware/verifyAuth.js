const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const verfifyAuth = asyncHandler(async (req, res, next) => {
  debugger;
  if (
    !req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    return res.sendStatus(401);
  }
  //
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  try {
    debugger;
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decode);
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized");
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
module.exports = verfifyAuth;
