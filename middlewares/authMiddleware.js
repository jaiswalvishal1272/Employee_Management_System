// const asyncHandler = require('express-async-handler');
// const Employees = require("../db/models/Employees");

// const checkPermission = (requiredPermission) => {
//   console.log("hello", checkPermission);
//     asyncHandler(async (req, resp, next) => {
//       try {
//         const ID = req.body.ID;
//         console.log(ID);
//         const employee = await Employees.findById('ID').populate('roleId');
//         if(!employee) {
//             resp.status(404);
//             throw new Error("NOT_FOUND");
//         }
//         if(!employee.roleId.permissions.includes(requiredPermission)) {
//             resp.status(403);
//             throw new Error("FORBIDDEN");
//         }
//         next();
//       }
//       catch(error) {
//         next(error);
//       }
//     }
// )};

// module.exports = { checkPermission };

const asyncHandler = require('express-async-handler');
const Employees = require("../db/models/Employees");

const checkPermission = (requiredPermission) => {
  console.log("check permissions");
  return asyncHandler(async (req, resp, next) => {
    try {
      const ID = req.params.id;
      const employee = await Employees.findById(ID).populate('roleId');
      
      if (!employee) {
        resp.status(404);
        throw new Error("NOT_FOUND");
      }
      
      if (!employee.roleId.permissions.includes(requiredPermission)) {
        resp.status(403);
        throw new Error("FORBIDDEN");
      }
      
      next();
    } catch (error) {
      next(error);
    }
  });
};

module.exports = { checkPermission };
