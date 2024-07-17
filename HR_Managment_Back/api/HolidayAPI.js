var express = require("express");
var Common = require("../common");
var HolidayCtrl = require("./../controller/HolidayCtrl");
var router = express.Router();

router.post("/AddUpdateHoliday", function (req, res) {
    var Data = req.body;
    HolidayCtrl.AddUpdateHoliday(Data)
      .then((data) => {
        if (data) {
          res.json(data);
        }
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.post("/getHolidayDataList", function (req, res) {
    var Data = req.body;
    HolidayCtrl.getHolidayDataList(Data)
      .then((data) => {
        if (data) {
          res.json(data);
        }
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.post("/DeleteHoliday", function (req, res) {
    var Data = req.body;
    HolidayCtrl.DeleteHoliday(Data)
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