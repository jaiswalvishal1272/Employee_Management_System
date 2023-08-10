const mongoose = require('mongoose');
const Employees = require("../db/Employees");

const getEmployee = async (req, resp) => {
    console.log(req.body.text);
    if(req.body.text) {
        const employee = await Employees.findOne(req.body);
        if(employee) {
            resp.status(200).send(employee);
        }
        else{
            resp.status.send(404).send({
                "result": "Invalid Credentials."
            });
        }
    }
    else {
        resp.status(400).send({
            "result": "All fields are required."
        });
    }
};

module.exports = { getEmployee };