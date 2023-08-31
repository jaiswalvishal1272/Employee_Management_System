const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    "ID": {
        type: String,
        required: [true, "Employee ID is a required field."],
        unique: true
    },
    "Name": {
        type: String,
        required: [true, "Employee Name is a required field."],
        minlength: 3,
        maxlength: 50
    },
    "Designation": {
        type: String,
        required: [true, "Employee Designation is a required field."],
        minlength: 2,
        maxlength: 20
    },
    "Employment_Type": {
        type: String,
        required: [true, "Employee Type is a required field."],
        enum: ["Permanent", "Intern"]
    },
    "Role": {
        type: String,
        required: [true, "Employee Role is a required field."]
    },
    "Personal_Email": {
        type: String,
        required: [true, "Employee Personal mail ID is a required field."],
        // unique: true,
        match: /^\S+@\S+\.\S+$/,
        maxlength:50
    },
    "Official_Email": {
        type: String,
        // unique: true,
        match: /^\S+@\S+\.\S+$/,
        maxlength: 50
    },
    "Conatact": {
        type: Number,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    "Password": {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    },
    "Aadhaar": {
        type: Number,
        required: [true, "Employee Aadhaar number is a required field."],
        // unique: true,
        minlength: 12,
        maxlength: 12
    },
    "PAN": {
        type: String,
        // unique: true,
        minlength: 10,
        maxlength: 10,
        uppercase: true
    },
    "DOB": String,
    "DOJ": String,
    "Address": {
        type: String,
        maxlength: 200
    },
    "Account_Number": Number,
    "Bank": {
        type: String,
        minlength: 2,
        maxlength: 50
    },
    "IFSC": String
});

module.exports = mongoose.model("employees", empSchema);