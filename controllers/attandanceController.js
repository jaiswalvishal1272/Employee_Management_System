require("../db/config");
const Attandance = require("../db/Attandance");

const attandanceMark = async (req, resp) => {
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
};

const attandanceList = async (req, resp) => {
    const attandanceData = await Attandance.find();
    console.log(attandanceData);
    resp.status(200).send(attandanceData);
};

const checkOut = async (req, resp) => {
    const attandanceData = await Attandance.updateOne(
        {Emp_ID: req.params.id},
        {$set: req.body}
    );
    if(attandanceData.matchedCount) {
        resp.status(200).send(attandanceData);
    }
    else {
        resp.status(404).send({
            "result": "Error"
        });
    }
};

module.exports = {
    attandanceMark,
    attandanceList,
    checkOut
};