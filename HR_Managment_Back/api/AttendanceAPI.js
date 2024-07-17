var express = require("express");
var Common = require("../common");
var AttendanceCtrl = require("./../controller/AttendanceCtrl");
var router = express.Router();

router.post("/AddUpdateUserAttendance", function (req, res) {
    var Data = req.body;
    AttendanceCtrl.AddUpdateUserAttendance(Data)
      .then((data) => {
        if (data) {
          res.json(data);
        }
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.post("/getAttendanceDataList", function (req, res) {
    var Data = req.body;
    AttendanceCtrl.getAttendanceDataList(Data)
      .then((data) => {
        if (data) {
          res.json(data);
        }
      })
      .catch((err) => {
        res.json(err);
      });
  });
  

  module.exports = router;