const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    const userRoles = Object.values(req.roles);
    console.log("userRoles", userRoles);
    const result = userRoles
      .map((role) => rolesArray.includes(role))
      .some((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
