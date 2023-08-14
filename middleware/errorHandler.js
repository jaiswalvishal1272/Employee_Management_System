const { constants } = require("../constants");
const errorHandler = (err, req, resp, next) => {
    const statusCode = resp.statusCode ? resp.statusCode : 500;

    console.log("Error Handling Middleware");
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            resp.json({
                success: false,
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            resp.json({
                success: false,
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.SERVER_ERROR:
            resp.json({
                success: false,
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        // default:
        //     console.log("Something went wrong");
        //     break;
    }
    
};

module.exports = errorHandler;