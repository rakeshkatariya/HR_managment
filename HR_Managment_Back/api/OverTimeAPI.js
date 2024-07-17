var express = require("express");
var Common = require("../common");
var OverTimeCtrl = require("./../controller/OverTimeCtrl");
var router = express.Router();

router.post("/AddUpdateOverTime", function (req, res) {
    var Data = req.body;
    OverTimeCtrl.AddUpdateOverTime(Data)
      .then((data) => {
        if (data) {
          res.json(data);
        }
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.post("/getOverTimeDataList", function (req, res) {
    var Data = req.body;
    OverTimeCtrl.getOverTimeDataList(Data)
      .then((data) => {
        if (data) {
          res.json(data);
        }
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.post("/DeleteOverTime", function (req, res) {
    var Data = req.body;
    OverTimeCtrl.DeleteOverTime(Data)
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