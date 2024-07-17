var express = require("express");
var Common = require("../common");
var EventCtrl = require("./../controller/EventCtrl");
var router = express.Router();

router.post("/AddUpdateEvent", function (req, res) {
    var Data = req.body;
    EventCtrl.AddUpdateEvent(Data)
      .then((data) => {
        if (data) {
          res.json(data);
        }
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.post("/getEventDataList", function (req, res) {
    var Data = req.body;
    EventCtrl.getEventDataList(Data)
      .then((data) => {
        if (data) {
          res.json(data);
        }
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.post("/DeleteEvent", function (req, res) {
    var Data = req.body;
    EventCtrl.DeleteEvent(Data)
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