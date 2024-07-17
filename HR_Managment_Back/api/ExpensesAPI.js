var express = require("express");
var Common = require("../common");
var ExpensesCtrl = require("./../controller/ExpensesCtrl");
var router = express.Router();

router.post("/AddUpdateExpenses", function (req, res) {
  var Data = req.body;
  ExpensesCtrl.AddUpdateExpenses(Data)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/getExpensesDataList", function (req, res) {
  var Data = req.body;
  ExpensesCtrl.getExpensesDataList(Data)
    .then((data) => {
      if (data) {
        console.log(data);
        res.json(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post("/DeleteExpenses", function (req, res) {
  var Data = req.body;
  ExpensesCtrl.DeleteExpenses(Data)
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
