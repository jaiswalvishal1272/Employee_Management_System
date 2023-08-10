const mongoose = require('mongoose');
const Employees = require("../db/Employees");

const createEmployee = async (req, resp) => {
    if(req.body) {
        let emp = new Employees(req.body);
        emp = await emp.save();
        console.log(emp);
        resp.status(201).send(emp);
    }
    else {
        resp.status(500).send({
            "result": "Internal Server Error"
        });
    }
};

module.exports = { createEmployee };