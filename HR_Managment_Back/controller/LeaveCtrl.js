var Common = require("./../common");
const bcrypt = require("bcrypt");
var connection = require("../MySqlConnect");

var LeaveCtrl = {
  AddUpdateLeave: AddUpdateLeave,
  getLeaveDataList: getLeaveDataList,
  DeleteLeave: DeleteLeave,
  LeaveApprovalByAdmin: LeaveApprovalByAdmin,
  getLeaveRequestList: getLeaveRequestList,
};

function AddUpdateLeave(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_AddUpdateLeave ('${JSON.stringify(data)}')`;
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

function getLeaveDataList(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_getLeaveDataList`;
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
          message: "Get leave data successfully",
          messageType: "success",
        });
      }
    });
  });
}

function DeleteLeave(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_DeleteLeave('${data.LeaveId}','${data.UserId}')`;
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

function getLeaveRequestList(data) {
  return new Promise((resolve, reject) => {
    let Query = `EXEC [sp_getLeaveRequestList] '${data.UserType}'`;
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
          message: "Get leave data successfully",
          messageType: "success",
        });
      }
    });
  });
}

function LeaveApprovalByAdmin(data) {
  return new Promise((resolve, reject) => {
    let leaveId = data.LeaveId ? `${data.LeaveId}` : "";
    let Query = `EXEC sp_LeaveApprovalByAdmin '${data.UserId}','${leaveId}','${data.LeaveStatus}'`;
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

module.exports = LeaveCtrl;
