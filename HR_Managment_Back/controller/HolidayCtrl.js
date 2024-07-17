var Common = require("./../common");
const bcrypt = require("bcrypt");
var connection = require("../MySqlConnect");

var HolidayCtrl = {
  AddUpdateHoliday: AddUpdateHoliday,
  getHolidayDataList: getHolidayDataList,
  DeleteHoliday: DeleteHoliday,
};

function AddUpdateHoliday(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_AddUpdateHoliday ('${JSON.stringify(data)}')`;
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
          message: Res[0][0].Massage,
          messageType: Res[0][0].MessageType,
        });
      }
    });
  });
}

function getHolidayDataList(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_getHolidayDataList`;
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
          message: "Get holiday data successfully",
          messageType: "success",
        });
      }
    });
  });
}

function DeleteHoliday(data) {
  return new Promise((resolve, reject) => {
    let Query = `call spDeleteHoliday('${data.HolidayId}','${data.UserId}')`;
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
          success: Res[0][0].MessageType == "success" ? true : false,
          data: Res,
          message: Res[0][0].Message,
          messageType: Res[0][0].MessageType,
        });
      }
    });
  });
}

module.exports = HolidayCtrl;
