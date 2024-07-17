var Common = require("./../common");
const bcrypt = require("bcrypt");
var connection = require("../MySqlConnect");

var TimeSheetCtrl = {
  getTimeSheetDataList: getTimeSheetDataList,
};


function getTimeSheetDataList(data) {
  return new Promise((resolve, reject) => {
    let Query = `EXEC sp_getTimeSheetDataList '${data.UserId}'`;
    connection.query(Query, (Err, Res) => {
      if (Err) {
        reject({
          success: false,
          message: Common.ExceptionMsg,
          messageType: "error",
          error: Err,
        });
      } else {
        // if (Res.data.recordsets?.length) {
        //     let response = Res.data.recordsets[0];
        //     let responseOne = Res[1]?.length ? Res[1] : [];
        //     let tempData = []
        //     for(let i = 0; i < response.length; i++) {
        //         for(let j = 0; j < responseOne.length; j++) {
        //             // if (response[i]?.UserId === responseOne[j].UserId) {
        //                 tempData.push(responseOne[j])
        //             // }
        //         }
        //         response[i].dayWiseData = tempData;
        //         tempData = []
        //     }
        //     resolve({
        //         "success": true,
        //         "data": response,
        //         "message": "Get care off master successfully",
        //         "messageType": "success"
        //     });
        // } else {
        //     resolve({
        //         "success": true,
        //         "data": [],
        //         "message": "Care off master empty",
        //         "messageType": "success"
        //     });
        // }
        resolve({
          success: true,
          data: Res,
          message: "Get time sheet data successfully",
          messageType: "success",
        });
      }
    });
  });
}


module.exports = TimeSheetCtrl;
