var Common = require("./../common");
const bcrypt = require("bcrypt");
var connection = require("../MySqlConnect");

var ExpensesCtrl = {
  AddUpdateExpenses: AddUpdateExpenses,
  getExpensesDataList: getExpensesDataList,
  DeleteExpenses: DeleteExpenses,
};

function AddUpdateExpenses(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_AddUpdateExpenses ('${JSON.stringify(data)}')`;
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
          data: [],
          message: Res[0][0].Message,
          messageType: Res[0][0].MessageType,
        });
      }
    });
  });
}

function getExpensesDataList(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_getExpensesDataList ('${data.UserId}')`;
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
          message: "Get expenses data successfully",
          messageType: "success",
        });
      }
    });
  });
}

function DeleteExpenses(data) {
  return new Promise((resolve, reject) => {
    let Query = `call sp_DeleteExpenses('${data.ExpensesId}','${data.UserId}')`;
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

module.exports = ExpensesCtrl;
