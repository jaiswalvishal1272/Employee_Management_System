const express = require('express');
const router = express.Router();
const {
    createDevice,
    getDevices,
    getDevice,
    getDeviceByAnyField,
    updateDevice,
    removeDevice
} = require("../controllers/deviceController");

router.route("/").post(createDevice).get(getDevices);

router.route("/:key").get(getDevice).put(updateDevice).delete(removeDevice);

router.route("/:key/:value").get(getDeviceByAnyField);

module.exports = router;