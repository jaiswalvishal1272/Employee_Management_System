// const express = require('express');
// const router = express.Router();
// const { checkPermission } = require("../middlewares/authMiddleware");
// const { createEmployee } = require("../controllers/signUpController");

// router.route("/")
//   .post(checkPermission("create_employee"), createEmployee);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { checkPermission } = require("../middlewares/authMiddleware");
const { createEmployee } = require("../controllers/signUpController");

router.route("/:id").post(createEmployee);

module.exports = router;
