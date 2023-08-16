const asyncHandler = require('express-async-handler');
const Devices = require("../db/models/Devices");

// description: Create new device
// route: POST /device
const createDevice = asyncHandler(async (req, resp) => {
    console.log(req.body);
    if(req.body) {
        let device = new Devices(req.body);
        device = await device.save();
        console.log(device);
        resp.status(201).send(device);
    }
    else {
        resp.status(400);
        throw new Error("VALIDATION_ERROR");
    }
});

// description: Get all the devices
// route: GET /device
const getDevices = asyncHandler(async (req, resp) => {
    const devices = await Devices.find();
    console.log(devices);
    resp.status(200).send(devices);
});

// description: Get devices by it's name or type
// route: GET /device/:key
const getDevice = asyncHandler(async (req, resp) => {
    const devices = await Devices.find({
        $or:
        [
            {
                Device_Name: { $regex: req.params.key }
            },
            {
                Type: { $regex: req.params.key}
            }
        ]
    });
    if(devices) {
        console.log(devices);
        resp.status(200).send(devices);
    }
    else {
        console.log('Not_Found');
        resp.status(404);
        throw new Error("NOT_FOUND");
    }
});

const getDeviceByAnyField = asyncHandler(async (req, resp) => {
    const devices = await Devices.find({[req.params.key]: req.params.value});
    if(devices) {
        resp.send(devices);
    }
    else {
        console.log('Not_Found');
        resp.status(404);
        throw new Error("NOT_FOUND");
    }
});

const updateDevice = asyncHandler(async (req, resp) => {
    const device = await Devices.updateOne(
        { Device_ID: req.params.key },
        { $set: req.body }
    );
    if(device.modifiedCount && device.matchedCount) {
        resp.status(200).send({
            "result": "Record has been updated.",
            "Details": device
        });
    }
    else if(device.matchedCount){
        resp.status(204).send({
            "result": "Nothing to Update.",
            "Details": device
        });
    }
    else {
        console.log('Not_Found');
        resp.status(404);
        throw new Error("NOT_FOUND");
    }
});

// desription: Remove device
// route: DELETE /device/:ID
const removeDevice = asyncHandler(async (req, resp) => {
    const device = await Devices.deleteOne({Device_ID: req.params.key});
    if(device.deletedCount) {
        resp.status(200).send({
            "result": "Record has been deleted.",
            "Details": device
        });
    }
    else {
        console.log('Not_Found');
        resp.status(404);
        throw new Error("NOT_FOUND");
    }
});

module.exports = {
    createDevice,
    getDevices,
    getDevice,
    getDeviceByAnyField,
    updateDevice,
    removeDevice
};