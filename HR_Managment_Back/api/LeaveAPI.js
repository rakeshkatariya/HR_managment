var express = require("express");
var Common = require("../common");
var LeaveCtrl = require("./../controller/LeaveCtrl");
var router = express.Router();

router.post("/AddUpdateLeave", function (req, res) {
  var Data = req.body;
  LeaveCtrl.AddUpdateLeave(Data)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/getLeaveDataList", function (req, res) {
  var Data = req.body;
  LeaveCtrl.getLeaveDataList(Data)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/DeleteLeave", function (req, res) {
  var Data = req.body;
  LeaveCtrl.DeleteLeave(Data)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/getLeaveRequestList", function (req, res) {
  var Data = req.body;
  LeaveCtrl.getLeaveRequestList(Data)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/LeaveApprovalByAdmin", function (req, res) {
  var Data = req.body;
  LeaveCtrl.LeaveApprovalByAdmin(Data)
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
