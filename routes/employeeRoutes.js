const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const verfifyAuth = require("../middleware/verifyAuth");

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.updateEmployee
  )
  .delete(
    verfifyAuth,
    verifyRoles(ROLES_LIST.Admin),
    employeesController.deleteEmployee
  );
router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
