const asyncHandler = require('express-async-handler');
const Attandance = require("../db/models/Attandance");

// description: To mark the attandance
// route: POST /attandance
const attandanceMark = asyncHandler(async (req, resp) => {
    if(req.body) {
        let attandanceData = new Attandance(req.body);
        attandanceData = await attandanceData.save();
        console.log(attandanceData);
        resp.status(201).send(attandanceData);
    }
    else {
        resp.send({
            "result": "Please, Fill the complete details."
        });
    }
});

// description: To get all attandance
// route: GET /attandance
const attandanceList = asyncHandler(async (req, resp) => {
    const attandanceData = await Attandance.find();
    console.log(attandanceData);
    resp.status(200).send(attandanceData);
});

// description: To checkout
// route: PUT /attandance/:ID
const checkOut = asyncHandler(async (req, resp) => {
    const attandanceData = await Attandance.updateOne(
        {Emp_ID: req.params.id},
        {$set: req.body}
    );
    if(attandanceData.matchedCount) {
        resp.status(200).send(attandanceData);
    }
    else {
        console.log('Not_Found');
        resp.status(404);
        throw new Error("NOT_FOUND");
    }
});

module.exports = {
    attandanceMark,
    attandanceList,
    checkOut
};