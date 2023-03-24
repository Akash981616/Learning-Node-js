const jwt = require("jsonwebtoken");
const generateToken = (user,Jwt_secret,expireTime) => {
  return jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: '1s' });
};
module.exports = generateToken;
