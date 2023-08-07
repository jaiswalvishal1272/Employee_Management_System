const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
require("./db/config");
const Employees = require("./db/Employees");
const Devices = require("./db/Devices");
const Attandance = require("./db/Attandance");

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.post("/employee", async (req, resp) => {
    console.log(req.body);
    if(req.body) {
        let emp = new Employees(req.body);
        emp = await emp.save();
        console.log(emp);
        resp.send(emp);
    }
    else {
        resp.send({"result": "Please fill all the details."});
    }
});

app.get("/employee", async (req, resp) => {
    const employees = await Employees.find();
    console.log(employees);
    resp.send(employees);
});

app.get("/employee/:key", async(req, resp) => {
    const employee = await Employees.findOne({
        $or:
        [
            {ID: req.params.key},
            {Name: req.params.key}
        ]
    });
    if(employee) {
        resp.send(employee);
    }
    else {
        resp.send({"result": "No Record Found"});
    }
});

app.get("/employee/:key/:value", async(req, resp) => {
    const employee = await Employees.find({[req.params.key]: req.params.value});
    if(employee) {
        resp.send(employee);
    }
    else {
        resp.send({"result": "No Record Found"});
    }
});

app.put("/employee/:ID", async (req, resp) => {
    const employee = await Employees.updateOne(
        { ID: req.params.ID },
        { $set: req.body }
    );
    if(employee.modifiedCount && employee.matchedCount) {
        resp.send({
            "result": "Record Updated Successfully",
            "Details": employee
        });
    }
    else if(employee.matchedCount) {
        resp.send({
            "result": "Nothing to Update",
            "Details": employee
        }); 
    }
    else {
        resp.send({
            "result": "No Record found to update",
            "Details": employee
        });
    }
});

app.delete("/employee/:ID", async (req, resp) => {
    const employee = await Employees.deleteOne({ID: req.params.ID});
    if(employee.deletedCount) {
        resp.send({
            "result": "Record Deleted Successfully.",
            "Details": employee
        });
    }
    else {
        resp.send({
            "result": "No Record Found.",
            "Details": employee
            
        });
    }
    
});




app.post("/device", async (req, resp) => {
    console.log(req.body);
    if(req.body) {
        let device = new Devices(req.body);
        device = await device.save();
        console.log(device);
        resp.send(device);
    }
    else {
        resp.send("Please, Fill the Details.");
    }
});

app.get("/device", async (req, resp) => {
    const devices = await Devices.find();
    console.log(devices);
    resp.send(devices);
});

app.get("/device/:key", async (req, resp) => {
    const devices = await Devices.find({
        $or:
        [
            {Device_Name: req.params.key},
            {Type: req.params.key}
        ]
    });
    if(devices) {
        console.log(devices);
        resp.send(devices);
    }
    else {
        resp.send({
            "result": "No Record Found."
        });
    }
});

app.get("/device/:key/:value", async (req, resp) => {
    const devices = await Devices.find({[req.params.key]: req.params.value});
    if(devices) {
        resp.send(devices);
    }
    else {
        resp.send({
            "result": "No Record Found."
        });
    }
});

app.put("/device/:Device_ID", async (req, resp) => {
    const device = await Devices.updateOne(
        { Device_ID: req.params.Device_ID },
        { $set: req.body }
    );
    if(device.modifiedCount && device.matchedCount) {
        resp.send({
            "result": "Record has been updated.",
            "Details": device
        });
    }
    else if(device.matchedCount){
        resp.send({
            "result": "Nothing to Update.",
            "Details": device
        });
    }
    else {
        resp.send({
            "result": "No Records Found.",
            "Details": device
        });
    }
});

app.delete("/device/:ID", async (req, resp) => {
    const device = await Devices.deleteOne({Device_ID: req.params.ID});
    if(device.deletedCount) {
        resp.send({
            "result": "Record has been deleted.",
            "Details": device
        });
    }
    else {
        resp.send({
            "result": "No Record Found.",
            "Details": device
        });
    }
});





app.post("/attandance", async (req, resp) => {
    if(req.body) {
        let attandanceData = new Attandance(req.body);
        attandanceData = await attandanceData.save();
        console.log(attandanceData);
        resp.send(attandanceData);
    }
    else {
        resp.send({
            "result": "Please, Fill the complete details."
        });
    }
});

app.get("/attandance", async (req, resp) => {
    const attandanceData = await Attandance.find();
    console.log(attandanceData);
    resp.send(attandanceData);
});

app.put("/attandance/:ID", async (req, resp) => {
    const attandanceData = await Attandance.updateOne(
        {Emp_ID: req.params.ID},
        {$set: req.body}
    );
    if(attandanceData.matchedCount) {
        resp.send(attandanceData);
    }
    else {
        resp.send("Error");
    }
});

app.get("/", async (req, resp) => {
    resp.send(`App is running on port ${ port }`);
});

app.listen(port, ()=> {
    console.log(`app is running on port ${port}`);
});



  