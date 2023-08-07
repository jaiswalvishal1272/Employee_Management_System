const mongoose = require('mongoose');

const attandanceSchema = new mongoose.Schema({
    "Emp_ID": String,
    "Emp_Name": String,
    "Designation": String,
    "Date": String,
    "Present": Boolean,
    "Working_Mode": String
},
{
    timestamps: { createdAt: 'Check_In', updatedAt: 'Check_Out'}
});

module.exports = mongoose.model("attandances", attandanceSchema);                                                                       