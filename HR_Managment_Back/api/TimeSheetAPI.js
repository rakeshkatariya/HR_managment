var express = require("express");
var Common = require("../common");
var TimeSheetCtrl = require("./../controller/TimeSheetCtrl");
var router = express.Router();

router.post("/getTimeSheetDataList", function (req, res) {
    var Data = req.body;
    TimeSheetCtrl.getTimeSheetDataList(Data)
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