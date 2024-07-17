var Common = require("./../common");
const bcrypt = require("bcrypt");
var connection = require("../MySqlConnect");

var AttendanceCtrl = {
  AddUpdateUserAttendance: AddUpdateUserAttendance,
  getAttendanceDataList: getAttendanceDataList,
};

function AddUpdateUserAttendance(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_AddUpdateAttendance('${JSON.stringify(data)}')`;
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
          success: Res[0][0].MessageType == "Success" ? true : false,
          data: [],
          message: Res[0][0].Message,
          messageType: Res[0][0].MessageType,
        });
      }
    });
  });
}

function getAttendanceDataList(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_getAttendanceDataList('${data.UserID}','${data.Month}')`;
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
          message: "Get attendance data successfully",
          messageType: "success",
        });
      }
    });
  });
}

module.exports = AttendanceCtrl;
