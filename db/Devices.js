const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    "Device_ID": String,
    "Device_Name": String,
    "Emp_ID": String,
    "Type": String,
    "Serial_Number": String,
    "RAM": Number,
    "Processor": Number,
    "Brand_Name": String,
    "Strage": Number,
    "Color": String,
    "Charger": Boolean
});

module.exports = mongoose.model("devices", deviceSchema);