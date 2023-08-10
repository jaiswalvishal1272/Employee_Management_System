const express = require('express');
const router = express.Router();
const { createEmployee } = require("../controllers/signUpController")

router.route("/").post(createEmployee);

module.exports = router;