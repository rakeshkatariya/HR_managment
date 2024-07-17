var Common = require("./../common");
const bcrypt = require("bcrypt");
var connection = require("../MySqlConnect");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../utils/sendEmail");
const config = require("../utils/config.json");

const userId = uuidv4();

var AuthenticationCtrl = {
  RegisterUser: RegisterUser,
  userLogin: userLogin,
  updateUserProfile: updateUserProfile,
  userChangePassword: userChangePassword,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
};

// function RegisterUser(data) {
//   return new Promise((resolve, reject) => {
//     let Query = `EXEC spAddUpdateRegisterUser'${data.UserId}','${data.FirstName}','${data.LastName}','${data.EmailId}','${data.Password}','${data.MobileNumber}','${data.Address}'`;

//     connection.query(Query, function (Err, Res) {
//       if (Err) {
//         reject({
//           success: false,
//           data: Err,
//           message: Err,
//           messageType: "error",
//         });
//       } else {
//         resolve({
//           success: Res.recordset[0].MassageType == "Success" ? true : false,
//           data: Res,
//           message: Res.recordset[0].Massage,
//           messageType: Res.recordset[0].MassageType,
//         });
//       }
//     });
//   });
// }

function RegisterUser(data) {
  return new Promise((resolve, reject) => {
    let Query = `Call spAddUpdateRegisterUser ('${JSON.stringify(data)}')`;

    connection.query(Query, function (Err, Res) {
      if (Err) {
        reject({
          success: false,
          data: Err,
          message: Err,
          messageType: "error",
        });
      } else {
        resolve({
          success: Res[0][0].MessageType == "Success" ? true : false,
          data: Res,
          message: Res[0][0].Massage,
          messageType: Res[0][0].MassageType,
        });
      }
    });
  });
}

function userLogin(data) {
  return new Promise((resolve, reject) => {
    let Query = `Call spUserLogin('${JSON.stringify(data)}')`;

    connection.query(Query, function (Err, Res) {
      if (Err) {
        reject({
          success: false,
          data: Err,
          message: Err,
          messageType: "error",
        });
      } else {
        resolve({
          success: Res[0][0].MessageType == "Success" ? true : false,
          data: Res[0],
          message: Res[0][0].Message,
          messageType: Res[0][0].MessageType,
        });
      }
    });
  });
}

// function userLogin(data) {
//   return new Promise((resolve, reject) => {
//     let userLoginQuery = `CALL spUserLogin(''); `;
//     connection.query(userLoginQuery, (userLoginErr, userLoginRes) => {
//       if (userLoginErr) {
//         reject(userLoginErr);
//       } else {
//         var Res = [];

//         if (userLoginRes[0].length > 0 && !Common.isEmpty(userLoginRes[0][0])) {
//           bcrypt.compare(
//             data.Password,
//             userLoginRes[0][0].Password,
//             function (err, isMatch) {
//               if (err) {
//                 reject(err);
//               } else if (isMatch) {
//                 if (Common.isEmpty(userLoginRes[0][0].last_login)) {
//                   Res = {
//                     success: false,
//                     data: userLoginRes[0][0],
//                     message: "Please setup account first",
//                     messagetype: "info",
//                   };
//                 } else {
//                   Res = {
//                     success: true,
//                     data: userLoginRes[0][0],
//                     message: "You are Logged In. Welcome!",
//                     messagetype: "success",
//                   };
//                 }
//                 Res = {
//                   success: true,
//                   data: userLoginRes[0][0],
//                   message: "You are Logged In. Welcome!",
//                   messagetype: "success",
//                 };
//                 resolve(Res);
//               } else {
//                 Res = {
//                   success: false,
//                   data: [],
//                   message: "Incorrect Password",
//                   messagetype: "error",
//                 };
//                 resolve(Res);
//               }
//             }
//           );
//         } else {
//           Res = {
//             success: false,
//             data: [],
//             message: "Invalid Username/Password",
//             messagetype: "error",
//           };
//           resolve(Res);
//         }
//       }
//     });
//   });
// }

function updateUserProfile(data) {
  return new Promise((resolve, reject) => {
    let Query = `EXEC sp_UpdateUserProfile'${data.data.UserId}', '${data.data.FirstName}', '${data.data.LastName}', '${data.data.EmailId}', '${data.data.MobileNumber}', '${data.data.Address}', '${data.ProfilePhoto}'
      `;
    connection.query(Query, (Err, Res) => {
      if (Err) {
        reject({
          success: false,
          message: Err,
          messageType: "error",
          error: Err,
        });
      } else {
        resolve({
          success: Res.recordset[0].MassageType == "Success" ? true : false,
          data: [],
          message: Res.recordsets[0][0].Massage,
          messageType: Res.recordsets[0][0].MassageType,
        });
      }
    });
  });
}

function forgotPassword(data) {
  return new Promise((resolve, reject) => {
    let Query = `EXEC sp_ForgotPassword'${data.MobileNumber}', '${data.OldPassword}', '${data.NewPassword}'`;
    connection.query(Query, (Err, Res) => {
      if (Err) {
        reject({
          success: false,
          message: Err,
          messageType: "error",
          error: Err,
        });
      } else {
        resolve({
          success: Res.recordset[0].MassageType == "Success",
          data: Res,
          message: Res.recordset[0].Massage,
          messageType: Res.recordset[0].MassageType,
        });
      }
    });
  });
}

function userChangePassword(data) {
  return new Promise((resolve, reject) => {
    if (!Common.isEmpty(data.NewPassword)) {
      var chekUserQuery = `SELECT su.Password FROM UserData su WHERE su.UserId = '${data.UserId}'`;

      connection.query(chekUserQuery, (checkUserErr, checkUserRows) => {
        if (checkUserErr) {
          reject({
            success: false,
            error: checkUserErr,
            message: Common.ExceptionMsg,
          });
        } else {
          // console.log(checkUserRows.length)
          if (checkUserRows.length > 0) {
            bcrypt.compare(
              data.CurrentPassword,
              checkUserRows[0].Password,
              function (err, isMatch) {
                if (err) {
                  reject(err);
                } else if (isMatch) {
                  bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                      return next(err);
                    }
                    bcrypt.hash(data.NewPassword, salt, function (err, hash) {
                      if (err) {
                        return next(err);
                      }

                      data.NewPassword = hash;

                      let Query = `CALL spUpdatePassword('${data.UserID}', '${data.NewPassword}')`;
                      connection.query(Query, (updateErr, updateQuery) => {
                        console.log("Update", updateQuery);

                        if (updateErr) {
                          reject({
                            success: false,
                            message: Common.ExceptionMsg,
                            messagetype: "error",
                            err: updateErr,
                          });
                        } else {
                          resolve({
                            success: true,
                            message: "Password updated successfully",
                            messagetype: "success",
                          });
                        }
                      });
                    });
                  });
                } else {
                  resolve({
                    success: false,
                    message: "Your current password is incorrect",
                    messagetype: "error",
                  });
                }
              }
            );
          } else {
            resolve({
              success: false,
              message: "User not found",
              messagetype: "error",
            });
          }
        }
      });
    }
  });
}

function DeleteUser(data) {
  return new Promise((resolve, reject) => {
    let Query = `CALL spDeleteUser('${data.UserID}')`;
    connection.query(Query, (Err, Res) => {
      if (Err) {
        reject({
          success: false,
          message: Err,
          messageType: "error",
          error: Err,
        });
      } else {
        resolve({
          success: true,
          data: [],
          message: Res[0][0].Message,
          messageType: Res[0][0].MessageType,
        });
      }
    });
  });
}

// function forgotPassword(data) {
//   return new Promise((resolve, reject) => {
//     if (!Common.isEmpty(data.LoginID)) {
//       var chekUserQuery = `CALL spCheckEmail('${data.LoginID}')`;

//       connection.query(chekUserQuery, (checkUserErr, checkUserRows) => {
//         if (checkUserErr) {
//           reject({
//             success: false,
//             error: checkUserErr,
//             message: Common.ExceptionMsg,
//           });
//         } else {
//           if (checkUserRows.length && checkUserRows[0].length) {
//             const token = uuidv4();
//             let Query = `CALL spAddResetPasswordToken('${checkUserRows[0][0].SecurityUserID}', '${token}')`;
//             connection.query(Query, (Err, Res) => {
//               if (Err) {
//                 reject(Err);
//               } else {
//                 console.log("Update Token");
//               }
//             });
//             // let currentDate = new Date()
//             // let ResetPasswordExpires = moment(new Date(currentDate.getTime() + (30 * 60 * 1000))).format('yyyy-mm-dd HH:MM:ss a');
//             // console.log("ResetPasswordExpires", ResetPasswordExpires)
//             // let updateTokenQuery = `UPDATE SecurityUser SET ResetPasswordToken = '${token}', ResetPasswordExpires = '${ResetPasswordExpires}' WHERE LoginID = '${data.UserID}'`
//             // connection.query(updateTokenQuery, (UpdateErr, UpdateRows) => {

//             //     if (UpdateErr) {
//             //         reject({
//             //             "success": false,
//             //             "error": UpdateErr,
//             //             "message": Common.ExceptionMsg
//             //         })
//             //     }
//             //     else {
//             //         console.log("Update Token")
//             //     }
//             // })

//             let message;
//             const resetUrl = `${ config.linkOrigin } /reset-password?token=${token}`;
//             message = `<pre>Please click the below link to reset your password, the link will be valid for 1 day:</pre>
//                         <pre><a href="${resetUrl}">${resetUrl}</a></pre>
//                         <h5>Thanks</h5>
//                         <h6>Equator - Treema</h6>`;

//             sendEmail({
//               to: checkUserRows[0][0].Email,
//               subject: "Reset Password - Treema",
//               html: `<h5>Hello User,</h5>
//                                     ${message}`,
//             });

//             resolve({
//               success: true,
//               message: "Email Send Successfully",
//               messagetype: "success",
//             });
//           } else {
//             resolve({
//               success: false,
//               message: "User not found",
//               messagetype: "error",
//             });
//           }
//         }
//       });
//     } else {
//       reject({
//         success: false,
//         error: "empty email",
//         message: "email required",
//       });
//     }
//   });
// }

function resetPassword(data) {
  return new Promise((resolve, reject) => {
    let Query = `CALL sp_ResetPassword('${data.UserId}','${data.NewPassword}')`;
    connection.query(Query, (Err, Res) => {
      if (Err) {
        reject({
          success: false,
          message: Err,
          messageType: "error",
          error: Err,
        });
      } else {
        resolve({
          success: true,
          data: [],
          message: Res[0][0].Message,
          messageType: Res[0][0].MessageType,
        });
      }
    });
  });
}

function userChangePassword(data) {
  return new Promise((resolve, reject) => {
    if (!Common.isEmpty(data.NewPassword)) {
      var chekUserQuery = `SELECT * from x_user WHERE contact_no ='${data.UserID}'`;

      connection.query(chekUserQuery, (checkUserErr, checkUserRows) => {
        if (checkUserErr) {
          reject({
            success: false,
            error: checkUserErr,
            message: Common.ExceptionMsg,
          });
        } else {
          if (checkUserRows.length > 0) {
            bcrypt.compare(
              data.CurrentPassword,
              checkUserRows[0].password,
              function (err, isMatch) {
                if (err) {
                  reject(err);
                } else if (isMatch) {
                  bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                      return next(err);
                    }
                    bcrypt.hash(data.NewPassword, salt, function (err, hash) {
                      if (err) {
                        return next(err);
                      }

                      data.NewPassword = hash;

                      let Query = `CALL spChangePassword('${data.NewPassword}','${data.UserID}')`;
                      connection.query(Query, (updateErr, updateQuery) => {
                        if (updateErr) {
                          reject({
                            success: false,
                            message: Common.ExceptionMsg,
                            messagetype: "error",
                            err: updateErr,
                          });
                        } else {
                          resolve({
                            success: true,
                            message: "Password Updated Successfully",
                            messagetype: "success",
                          });
                        }
                      });
                    });
                  });
                } else {
                  resolve({
                    success: false,
                    message: "Your current password is incorrect",
                    messagetype: "error",
                  });
                }
              }
            );
          } else {
            resolve({
              success: false,
              message: "User not found",
              messagetype: "error",
            });
          }
        }
      });
    }
  });
}

function getUserMenu(data) {
  return new Promise((resolve, reject) => {
    if (!Common.isEmpty(data.UserID)) {
      let Query = `CALL spGetUserMenu('${data.UserID}')`;
      connection.query(Query, (Err, Res) => {
        if (Err) {
          reject({
            success: false,
            message: Common.ExceptionMsg,
            messageType: "error",
            error: Err,
          });
        } else {
          let data = Res[0];
          let childMenus = Res[1];
          data.forEach((element) => {
            element["SubMenus"] = childMenus.filter(
              (x) => x.ParentId == element.MenuID
            );
          });
          resolve({
            success: true,
            data: data,
            message: "Get User Menu List successfully",
            messageType: "success",
          });
        }
      });
    } else {
      reject({
        success: false,
        message: "Parameter missing!",
        messageType: "error",
      });
    }
  });
}

module.exports = AuthenticationCtrl;
