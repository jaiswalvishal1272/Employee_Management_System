require("../db/config");
const Employees = require("../db/Employees");

const createEmployee = async (req, resp) => {
    console.log(req.body);
    if(req.body) {
        let emp = new Employees(req.body);
        emp = await emp.save();
        console.log(emp);
        resp.status(201).send(emp);
    }
    else {
        resp.send({"result": "Please fill all the details."});
    }
};

const getEmployees = async (req, resp) => {
    const employees = await Employees.find();
    console.log(employees);
    resp.status(200).send(employees);
};

const getEmployee = async(req, resp) => {
    const employee = await Employees.findOne({
        $or:
        [
            {ID: req.params.key},
            {Name: req.params.key}
        ]
    });
    if(employee) {
        resp.status(200).send(employee);
    }
    else {
        resp.status(404).send({"result": "No Record Found"});
    }
};

const getEmployeeByAnyField = async(req, resp) => {
    const employee = await Employees.find({[req.params.key]: req.params.value});
    if(employee) {
        resp.status(200).send(employee);
    }
    else {
        resp.status(404).send({"result": "No Record Found"});
    }
};

const updateEmployee = async (req, resp) => {
    const employee = await Employees.updateOne(
        // { ID: req.params.key },
        { $set: req.body }
    );
    if(employee.modifiedCount && employee.matchedCount) {
        resp.status(200).send({
            "result": "Record Updated Successfully",
            "Details": employee
        });
    }
    else if(employee.matchedCount) {
        resp.status(204).send({
            "result": "Nothing to Update",
            "Details": employee
        }); 
    }
    else {
        resp.status(404).send({
            "result": "No Record found to update",
            "Details": employee
        });
    }
};

const removeEmployee = async (req, resp) => {
    const employee = await Employees.deleteOne({ID: req.params.key});
    if(employee.deletedCount) {
        resp.status(200).send({
            "result": "Record Deleted Successfully.",
            "Details": employee
        });
    }
    else {
        resp.status(404).send({
            "result": "No Record Found.",
            "Details": employee
            
        });
    }
};

module.exports = {
    createEmployee,
    getEmployees,
    getEmployee,
    getEmployeeByAnyField,
    updateEmployee,
    removeEmployee
};