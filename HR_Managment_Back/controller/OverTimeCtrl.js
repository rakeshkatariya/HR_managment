var Common = require("./../common");
const bcrypt = require("bcrypt");
var connection = require("../MySqlConnect");

var OverTimeCtrl = {
  AddUpdateOverTime: AddUpdateOverTime,
  getOverTimeDataList: getOverTimeDataList,
  DeleteOverTime: DeleteOverTime,
};

function AddUpdateOverTime(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_AddUpdateOverTime ('${JSON.stringify(data)}')`;
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
          data: Res,
          message: Res[0][0].Message,
          messageType: Res[0][0].MessageType,
        });
      }
    });
  });
}

function getOverTimeDataList(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_getOverTimeDataList('${data.UserId}')`;
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
          data: Res[0],
          message: "Get Over time data successfully",
          messageType: "success",
        });
      }
    });
  });
}

function DeleteOverTime(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_DeleteOverTime('${data.OverTimeId}','${data.UserId}')`;
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

module.exports = OverTimeCtrl;
