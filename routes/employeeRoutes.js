const express = require('express');
const router = express.Router();
const {
    createEmployee,
    getEmployees,
    getEmployee,
    getEmployeeByAnyField,
    updateEmployee,
    removeEmployee
} = require("../controllers/employeeController");


router.route("/").get(getEmployees).post(createEmployee);

router.route("/:key").get(getEmployee).put(updateEmployee).delete(removeEmployee);

router.route("/:key/:value").get(getEmployeeByAnyField);

module.exports = router;