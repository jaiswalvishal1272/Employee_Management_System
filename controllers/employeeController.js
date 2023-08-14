const asyncHandler = require('express-async-handler');
const Employees = require("../db/models/Employees");

// description: Create Employee
// route: POST /employee
const createEmployee = asyncHandler(async (req, resp) => {
    console.log(req.body);
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
});

// description: Get all employees
// route: GET /employee
const getEmployees = asyncHandler(async (req, resp) => {
    const employees = await Employees.find();
    console.log(employees);
    if(employees) {
        resp.status(200).send(employees);
    }
    else {
        console.log('Not_Found');
        resp.status(404);
        throw new Error("NOT_FOUND");
    }
});

// description: Get employee by name or ID
// route: GET /employee/:key
const getEmployee = asyncHandler(async(req, resp) => {
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
        console.log('Not_Found');
        resp.status(404);
        throw new Error("NOT_FOUND");
    }
});

// description: Get employee by any field
// route: GET /employee/:key/:value
const getEmployeeByAnyField = asyncHandler(async(req, resp) => {
    const employee = await Employees.find({[req.params.key]: req.params.value});
    if(employee) {
        resp.status(200).send(employee);
    }
    else {
        console.log('Not_Found');
        resp.status(404);
        throw new Error("NOT_FOUND");
    }
});

// description: Update the employee details
// route: PUT /employee/ID
const updateEmployee = asyncHandler(async (req, resp) => {
    const employee = await Employees.updateOne(
        { ID: req.params.key },
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
        console.log('Not_Found');
        resp.status(404);
        throw new Error("NOT_FOUND");
    }
});

// description: Remove employee
// route: DELETE /employee/:id
const removeEmployee = asyncHandler(async (req, resp) => {
    const employee = await Employees.deleteOne({ID: req.params.key});
    if(employee.deletedCount) {
        resp.status(200).send({
            "result": "Record Deleted Successfully.",
            "Details": employee
        });
    }
    else {
        console.log('Not_Found');
        resp.status(404);
        throw new Error("NOT_FOUND");
    }
});

module.exports = {
    createEmployee,
    getEmployees,
    getEmployee,
    getEmployeeByAnyField,
    updateEmployee,
    removeEmployee
};