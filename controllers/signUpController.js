const Employees = require("../db/models/Employees");

const createEmployee = async (req, resp) => {
    if(req.body) {
        let emp = new Employees(req.body);
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