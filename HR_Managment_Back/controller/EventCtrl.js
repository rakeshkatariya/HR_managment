var Common = require("./../common");
const bcrypt = require("bcrypt");
var connection = require("../MySqlConnect");

var EventCtrl = {
  AddUpdateEvent: AddUpdateEvent,
  getEventDataList: getEventDataList,
  DeleteEvent: DeleteEvent,
};

function AddUpdateEvent(data) {
  return new Promise((resolve, reject) => {
    let eventId = data.EventId ? `${data.EventId}` : "";
    let Query = `EXEC sp_AddUpdateEvent '${data.UserID}','${eventId}','${data.EventName}','${data.Date}','${data.Description}'`;
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

function getEventDataList(data) {
  return new Promise((resolve, reject) => {
    let Query = `EXEC sp_getEventDataList`;
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
          message: "Get event data successfully",
          messageType: "success",
        });
      }
    });
  });
}

function DeleteEvent(data) {
  return new Promise((resolve, reject) => {
    let Query = `EXEC sp_DeleteEvent'${data.EventId}','${data.UserId}'`;
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

module.exports = EventCtrl;
