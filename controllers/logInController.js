const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const Employees = require("../db/models/Employees");

// descripion: Login
// route: POST /login
const getEmployee = asyncHandler(async (req, resp) => {
    console.log(req.body);
    const { ID , Password } = req.body;
    if(req.body.ID) {
        const employee = await Employees.findOne(req.body);
        if(employee) {
            resp.status(200).send(employee);
        }
        else{
            console.log('Not_Found');
            resp.status(404);
            throw new Error("NOT_FOUND");
        }
    }
    else {
        resp.status(400);
        throw new Error("VALIDATION_ERROR");
    }
});

module.exports = { getEmployee };