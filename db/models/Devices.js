const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    "Device_ID": {
        type: String,
        required: [true, "Device ID is a required field."],
        unique: [true, "Device id is a unique field."]
    },
    "Device_Name": {
        type: String,
        required: [true, "Device Name is a required field."]
    },
    "Emp_ID": String,
    "Type": {
        type: String,
        require: [true, "Device type is a required field."]
    },
    "Serial_Number": {
        type: String,
        required: [true, "Serial Number is a required field."],
        unique: [true, "Serial number is a unique field."]
    },
    "RAM": Number,
    "Processor": Number,
    "Brand_Name": String,
    "Strage": Number,
    "Color": String,
    "Charger": Boolean,
    "Charger_Brand": String,
    "Charger_Serial_Number": String,
    "Mouse": Boolean,
    "Mouse_Brand": String,
    "Mouse_Serial_Number": String,
    "Status": String
});

module.exports = mongoose.model("devices", deviceSchema);