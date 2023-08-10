const express = require('express');
const { getEmployee } = require("../controllers/logInController");

const router = express.Router();

router.route("/").post(getEmployee);

module.exports = router;