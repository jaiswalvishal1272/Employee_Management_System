const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require("./db/config");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const port = process.env.PORT;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Employee Management System",
            version: "1.0.0",
            description: "It consists of Employee, Devices and attandance API."
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: ["server.js"]
};

const specs = swaggerJsDoc(options);

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/employee", require("./routes/employeeRoutes"));
app.use("/device/", require("./routes/deviceRoutes"));
app.use("/attandance", require("./routes/attandanceRoutes"));
app.use("/signup", require("./routes/signUpRoute"));
app.use("/login", require("./routes/logInRoute"));


app.use(errorHandler);

/**
 * @swagger
 * components:
 *  schemas:
 *      Employee:
 *          type: object
 *          properties:
 *              ID:
 *                  type: String
 *                  description: Empolyee ID
 *              Name:
 *                  type: String
 *                  description: Employee Name
 *              Designation: 
 *                  type: String
 *                  description: Employee Designation
 *              Employment_Type:
 *                  type: String
 *                  description: Employeement Designation
 *              Personal_Email: 
 *                  type: String
 *                  description: Personal mail id of employee
 *              Official_Email:
 *                  type: String
 *                  description: Official mail id of employee
 *              Aadhaar: 
 *                  type: Number
 *                  description: Aadhaar number of employee
 *              PAN:
 *                  type: String
 *                  description: PAN Number of Employee
 *              DOB:
 *                  type: String
 *                  description: Date of Birth of employee
 *              DOJ:
 *                  type: String
 *                  description: Date of Joining of employee
 *              Address: 
 *                  type: String
 *                  description: Address of employee
 *              Account_Number:
 *                  type: Number
 *                  description: Bank Account Number of employee
 *              Bank:
 *                  type: String
 *                  description: Name of bank 
 *              IFSC:
 *                  type: String
 *                  description: IFSC code of bank
 *          example:
 *              ID: 01
 *              Name: test1
 *              Designation: Developer
 *              Employment_Type: Permanant
 *              Personal_Email: test.personal@test.com
 *              Official_Email: test.official@test.com
 *              Aadhaar: 123412341234
 *              PAN: GHSG8733D
 *              DOB: 01/01/2000
 *              DOJ: 01/01/2023
 *              Address: Jaipur
 *              Account_Number: 1234567890
 *              Bank: State Bank of India
 *              IFSC: AA0000A
 *      Device:
 *          type: object
 *          properties:
 *              Device_ID: 
 *                  type: String
 *                  description: Device id
 *              Device_Name:
 *                  type: String
 *                  description: Device Name
 *              Emp_ID:
 *                  type: String
 *                  description: Employee id
 *              Type:
 *                  type: String
 *                  description: Device type
 *              Serial_Number:
 *                  type: String
 *                  description: Serial number printed on device by brand
 *              RAM:
 *                  type: Number
 *                  description: RAM if device is desktop/laptop (in GB)
 *              Processor:
 *                  type: Number
 *                  description: Processor speed if device is desktop/laptop (in GHz)
 *              Brand_Name:
 *                  type: String
 *                  description: Brand of device
 *              Color:
 *                  type: String
 *                  description: Colour of device
 *              Charger:
 *                  type: Boolean
 *                  description: true/false depending upon whether the charger is provided or not
 *          example:
 *              Device_ID: 03
 *              Device_Name: s052
 *              Emp_ID: 01
 *              Type: Laptop
 *              Serial_Number: kfhi837
 *              RAM: 8
 *              Processor: 3.2
 *              Brand_Name: HP
 *              Color: Grey
 *              Charger: true
 *      Attandance:
 *          type: object
 *          properties:
 *              Emp_ID:
 *                  type: String
 *                  description: Employee ID
 *              Emp_Name:
 *                  type: String
 *                  description: Employee Name
 *              Designation:
 *                  type: String
 *                  description: Employee Designation
 *              Date:
 *                  type: String
 *                  description: Date
 *              Present:
 *                  type: Boolean
 *                  description: Attandance mark(true/false)
 *              Working_Mode:
 *                  type: String
 *                  description: Working modes(WFO/WFH)
 *          example:
 *              Emp_ID: 01
 *              Emp_Name: test1
 *              Designation: Developer
 *              Date: 09/08/2023
 *              Present: true
 *              Working_Mode: WFO
 */

/**
 * @swagger
 * tags:
 *  - name: Employees
 *    description: The employee managing API
 *  - name: Devices
 *    description: The device managing API
 *  - name: Attandances
 *    description: The attandance managing API
 *  - name: Log In
 *    description: The login API
 *  - name: Sign Up
 *    description: The Signup API
 */





/**
 * @swagger
 * /employee:
 *  post:
 *      summary: To create a new employee in the system
 *      tags: [Employees]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Employee'
 *      responses:
 *          201:
 *              description: New employee added
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Employee'
 */

/**
 * @swagger
 * /employee:
 *  get:
 *      summary: Returns the list of all employees
 *      tags: [Employees]
 *      responses:
 *          200: 
 *              description: The list of employees
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Employee'
 */


/**
 * @swagger
 * /employee/{key}:
 *  get:
 *      summary: Search the employee by id or name
 *      tags: [Employees]
 *      parameters:
 *          - in: path
 *            name: key
 *            schema:
 *              type: String
 *            description: Searching entity (it may be employee id or employee name)          
 *      responses:
 *          200:
 *              description: Employee details
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Employee'
 *          400:
 *              description: No employee found
 */



/**
 * @swagger
 * /employee/{key}/{value}:
 *  get:
 *      summary: Search the employee by any of its field
 *      tags: [Employees]
 *      parameters:
 *          - in: path
 *            name: key
 *            schema:
 *              type: String
 *            description: Searching fields (it may any of its field, such as name, designation, etc.)
 *          - in: path
 *            name: value
 *            schema:
 *              type: String
 *            description: Searching entity
 *      responses:
 *          200:
 *              description: Employee details
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Employee'
 *          400:
 *              description: No employee found
 */


/**
 * @swagger
 * /employee/{id}:
 *  put:
 *      summary: Update the employee information by the id
 *      tags: [Employees]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: String
 *            description: The employee id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Employee'
 *      responses:
 *          200:
 *              description: The employee record has updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Employee'
 *          204:
 *              description: Nothing to update
 *          404:
 *              description: The employee record is not found
 */


/**
 * @swagger
 * /employee/{id}:
 *  delete:
 *      summary: To remove the employee from the system
 *      tags: [Employees]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: String
 *            description: The employee id
 *      responses:
 *          200:
 *              description: The employee record has removed
 *          404:
 *              description: The employee record is not found
 */







/**
 * @swagger
 * /device:
 *  post:
 *      summary: To create a new device record in the system
 *      tags: [Devices]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Device'
 *      responses:
 *          201:
 *              description: New device added
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Device'
 *        
 */


/**
 * @swagger
 * /device:
 *  get:
 *      summary: Return the list of all devices
 *      tags: [Devices]
 *      responses:
 *          200:
 *              description: The list of all devices
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Device'
 */


/**
 * @swagger
 * /device/{key}:
 *  get:
 *      summary: Search the device by device name or its type
 *      tags: [Devices]
 *      parameters:
 *          - in: path
 *            name: key
 *            schema: 
 *              type: String
 *            description: Searching entity (it may be device name or device type)
 *      responses:
 *          200:
 *              description: Device details
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Device'
 */


/**
 * @swagger
 * /device/{key}/{value}:
 *  get:
 *      summary: Search the device by any of its field
 *      tags: [Devices]
 *      parameters:
 *          - in: path
 *            name: key
 *            schema:
 *              type: String
 *            description: Searching fields (it may any of its field, such as type, brand name, etc.)
 *          - in: path
 *            name: value
 *            schema:
 *              type: String
 *            description: Searcing entity
 *      responses:
 *          200:
 *              description: Device details
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Device'
 *          404:
 *              description: Device not found
 */
// app.get("/device/:key/:value", async (req, resp) => {
//     const devices = await Devices.find({[req.params.key]: req.params.value});
//     if(devices) {
//         resp.send(devices);
//     }
//     else {
//         resp.send({
//             "result": "No Record Found."
//         });
//     }
// });

/**
 * @swagger
 * /device/{id}:
 *  put:
 *      summary: Update the device information by id
 *      tags: [Devices]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: String
 *            description: The device id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Device'
 *      responses:
 *          200:
 *              description: The device record has updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Device'
 *          204:
 *              description: Nothing to update
 *          404:
 *              description: The device is not found
 */


/**
 * @swagger
 * /device/{id}:
 *  delete:
 *      summary: Remove the device from the system
 *      tags: [Devices]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: String
 *            description: The device id
 *      responses:
 *          200:
 *              description: The device has removed
 *          404:
 *              description: The device has not found
 */






/**
 * @swagger
 * /attandance:
 *  post:
 *      summary: Mark the attandance in the system
 *      tags: [Attandances]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Attandance'
 *      responses:
 *          201:
 *              description: Attandance marked
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Attandance'
 */


/**
 * @swagger
 * /attandance:
 *  get:
 *      summary: Return the all attandance
 *      tags: [Attandances]
 *      responses:
 *          200:
 *              description: Attandance list
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Attandance'
 */


/**
 * @swagger
 * /attandance/{id}:
 *  put:
 *      summary: Mark the checkout in attandance
 *      tags: [Attandances]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: String
 *            description: Employee id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Attandance'
 *      responses:
 *          200:
 *              description: checkout marked
 *              content:
 *                  application/json:
 *                      content:
 *                          schema:
 *                              $ref: '#components/schemas/Attandance'
 *          404:
 *              description: Error occured
 */

app.get("/", async (req, resp) => {
    resp.send(`App is running on port ${ port }`);
});

app.listen(port, ()=> {
    console.log(`app is running on port ${port}`);
});



