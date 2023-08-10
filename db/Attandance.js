const mongoose = require('mongoose');

const attandanceSchema = new mongoose.Schema({
    "Emp_ID": String,
    "Emp_Name": String,
    "Date": String,
    "Month": Number,
    "Year": Number,
    "Working_Mode": String,
    "Type": String,
    "Half-Day_Type": String
},
{
    timestamps: { createdAt: 'Check_In', updatedAt: 'Check_Out'}
});

module.exports = mongoose.model("attandances", attandanceSchema);                                                                       