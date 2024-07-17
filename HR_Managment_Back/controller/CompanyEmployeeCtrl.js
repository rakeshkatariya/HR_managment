var Common = require("./../common");
const bcrypt = require("bcrypt");
var connection = require("../MySqlConnect");

var CompanyEmployeeCtrl = {
  AddUpdateCompanyEmployee: AddUpdateCompanyEmployee,
  getCompanyEmployeeDataList: getCompanyEmployeeDataList,
  getEmployeeDataById:getEmployeeDataById,
  DeleteCompanyEmployee: DeleteCompanyEmployee,
};

function AddUpdateCompanyEmployee(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_AddUpdateCompanyEmployee ('${JSON.stringify(data)}')`;
    connection.query(Query, function (Err, Res) {
      if (Err) {
        reject({
          success: false,
          data: [],
          message: Err,
          messageType: "error",
        });
      } else {
        resolve({
          success: Res[0][0].MessageType == "success" ? true : false,
          data: Res,
          message: Res[0][0].Message,
          messageType: Res[0][0].MessageType,
        });
      }
    });
  });
}

function getCompanyEmployeeDataList(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_getCompnyEmployeeList('${data.UserType}')`;
    connection.query(Query, (Err, Res) => {
      if (Err) {
        reject({
          success: false,
          message: Common.ExceptionMsg,
          messageType: "error",
          error: Err,
        });
      } else {
        resolve({
          success: true,
          data: Res,
          message: "Get Employee data successfully",
          messageType: "success",
        });
      }
    });
  });
};

function getEmployeeDataById(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_getEmployeeDataById('${data.EmployeeId}')`;
    connection.query(Query, (Err, Res) => {
      if (Err) {
        reject({
          success: false,
          message: Common.ExceptionMsg,
          messageType: "error",
          error: Err,
        });
      } else {
        resolve({
          success: true,
          data: Res,
          message: "Get Employee data ById successfully",
          messageType: "success",
        });
      }
    });
  });
};

function DeleteCompanyEmployee(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_DeleteCompanyEmployees('${data.EmployeeId}','${data.UserId}')`;
    connection.query(Query, (Err, Res) => {
      if (Err) {
        reject({
          success: false,
          message: Common.ExceptionMsg,
          messageType: "error",
          error: Err,
        });
      } else {
        resolve({
          success: Res[0][0].MessageType == "Success" ? true : false,
          data: Res,
          message: Res[0][0].Message,
          messageType: Res[0][0].MessageType,
        });
      }
    });
  });
}

module.exports = CompanyEmployeeCtrl;
