const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    "roleId": {
        type: String,
        required: [true, "Role ID is a required field."],
        unique: true
    },
    "type": {
        type: String,
        required: [true, "Role type is a required field."],
        unique: true,
        minlength: 2,
        maxlenght: 15
    },
    "permissions": {
        type: [String],
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("roles", roleSchema);