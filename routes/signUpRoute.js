const express = require('express');
const router = express.Router();
const { createEmployee } = require("../controllers/signUpController")

router.route("/", createEmployee);

module.exports = router;