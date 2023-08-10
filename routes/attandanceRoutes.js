const express = require('express');
const router = express.Router();

const {
    attandanceMark,
    attandanceList,
    checkOut
} = require("../controllers/attandanceController");

router.route("/").post(attandanceMark).get(attandanceList);

router.route("/:id").put(checkOut);

module.exports = router;