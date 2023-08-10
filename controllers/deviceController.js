require("../db/config");
const Devices = require("../db/Devices");

const createDevice = async (req, resp) => {
    console.log(req.body);
    if(req.body) {
        let device = new Devices(req.body);
        device = await device.save();
        console.log(device);
        resp.status(201).send(device);
    }
    else {
        resp.send("Please, Fill the Details.");
    }
};

const getDevices = async (req, resp) => {
    const devices = await Devices.find();
    console.log(devices);
    resp.status(200).send(devices);
};

const getDevice = async (req, resp) => {
    const devices = await Devices.find({
        $or:
        [
            {Device_Name: req.params.key},
            {Type: req.params.key}
        ]
    });
    if(devices) {
        console.log(devices);
        resp.status(200).send(devices);
    }
    else {
        resp.send({
            "result": "No Record Found."
        });
    }
};

const getDeviceByAnyField = async (req, resp) => {
    const devices = await Devices.find({[req.params.key]: req.params.value});
    if(devices) {
        resp.send(devices);
    }
    else {
        resp.send({
            "result": "No Record Found."
        });
    }
};

const updateDevice = async (req, resp) => {
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
        resp.status(404).send({
            "result": "No Records Found.",
            "Details": device
        });
    }
};

const removeDevice = async (req, resp) => {
    const device = await Devices.deleteOne({Device_ID: req.params.key});
    if(device.deletedCount) {
        resp.status(200).send({
            "result": "Record has been deleted.",
            "Details": device
        });
    }
    else {
        resp.status(404).send({
            "result": "No Record Found.",
            "Details": device
        });
    }
};

module.exports = {
    createDevice,
    getDevices,
    getDevice,
    getDeviceByAnyField,
    updateDevice,
    removeDevice
};