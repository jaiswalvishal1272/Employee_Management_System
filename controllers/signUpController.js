const bcrypt = require('bcrypt');
const Employees = require("../db/models/Employees");

const createEmployee = async (req, resp) => {
    console.log(req.body);
    const {Password, ...employeeData} = req.body;
    if(req.body) {
        const hashedPassword = await bcrypt.hash(Password, 10);
        let emp = new Employees({...employeeData, Password: hashedPassword});
        emp = await emp.save();
        console.log(emp);
        resp.status(201).send(emp);
    }
    else {
        resp.status(400);
        throw new Error("VALIDATION_ERROR");
    }
};

module.exports = { createEmployee };