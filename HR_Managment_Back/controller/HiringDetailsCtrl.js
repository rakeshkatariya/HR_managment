var Common = require("./../common");
const bcrypt = require("bcrypt");
var connection = require("../MySqlConnect");

var HiringDetailsCtrl = {
  AddHiringEmployee: AddHiringEmployee,
  GetHiringEmployeeDataList: GetHiringEmployeeDataList,
  DeleteHiringEmployee: DeleteHiringEmployee,
};

function AddHiringEmployee(data) {
  return new Promise((resolve, reject) => {
    let employeeId = data.EmployeeId ? `${data.EmployeeId}` : "";
    let Query = `EXEC spAddHiringEmployee '${employeeId}','${data.UserId}','${data.EmployeeName}','${data.MobileNo}','${data.Occupation}','${data.Email}','${data.Address}'`;
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
          success: Res.recordset[0].MassageType == "Success" ? true : false,
          data: Res,
          message: Res.recordset[0].Massage,
          messageType: Res.recordset[0].MassageType,
        });
      }
    });
  });
}

function GetHiringEmployeeDataList(data) {
  return new Promise((resolve, reject) => {
    let Query = `EXEC sp_GetHiringEmployeeDataList`;
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
          message: "Get Hiring data successfully",
          messageType: "success",
        });
      }
    });
  });
}

function DeleteHiringEmployee(data) {
  return new Promise((resolve, reject) => {
    let Query = `EXEC sp_DeleteHiringEmployee'${data.EmployeeId}','${data.UserId}'`;
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
          success: Res.recordset[0].MassageType == "Success" ? true : false,
          data: Res,
          message: Res.recordset[0].Massage,
          messageType: Res.recordset[0].MassageType,
        });
      }
    });
  });
}

module.exports = HiringDetailsCtrl;
