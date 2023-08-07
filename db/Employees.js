const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    "ID": String,
    "Name": String,
    "Designation": String,
    "Employment_Type": String,
    "Personal_Email": String,
    "Official_Email": String,
    "Conatact": Number,
    "Aadhaar": Number,
    "PAN": String,
    "DOB": String,
    "DOJ": String,
    "Address": String,
    "Account Number": Number,
    "Bank": String,
    "IFSC": String
});

module.exports = mongoose.model("employees", empSchema);