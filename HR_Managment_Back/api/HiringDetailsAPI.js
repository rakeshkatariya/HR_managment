var express = require("express");
var Common = require("../common");
var HiringDetailsCtrl = require("./../controller/HiringDetailsCtrl");
var router = express.Router();

router.post("/AddHiringEmployee", function (req, res) {
    var Data = req.body;
    HiringDetailsCtrl.AddHiringEmployee(Data)
      .then((data) => {
        if (data) {
          res.json(data);
        }
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.post("/GetHiringEmployeeDataList", function (req, res) {
    var Data = req.body;
    HiringDetailsCtrl.GetHiringEmployeeDataList(Data)
      .then((data) => {
        if (data) {
          res.json(data);
        }
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.post("/DeleteHiringEmployee", function (req, res) {
    var Data = req.body;
    HiringDetailsCtrl.DeleteHiringEmployee(Data)
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