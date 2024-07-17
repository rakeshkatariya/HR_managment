var express = require("express");
var Common = require("../common");
const jwt = require("jsonwebtoken");
var AuthenticationCtrl = require("./../controller/AuthenticationCtrl");
var router = express.Router();

var moment = require("moment");
var multer = require("multer");
var fs = require("fs");

let fileArray = [];
var Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = "document/";
    //  + Common.PropertyMediaPath;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // let inputData = Common.isEmpty(req.body.data) === false ? JSON.parse(req.body.data) : req.body;
    let fileName =
      moment().format("DD_MM_YYYY_HH_mm_ss") +
      "profile-" +
      file.fieldname +
      "." +
      file.originalname.split(".").pop();
    console.log("filename", fileName);
    fileArray.push({ FileName: fileName });
    cb(null, fileName);
  },
});
var upload = multer({
  storage: Storage,
});

router.post("/RegisterUser", function (req, res) {
  var Data = req.body;
  AuthenticationCtrl.RegisterUser(Data)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/login", function (req, res) {
  var Data = req.body;
  AuthenticationCtrl.userLogin(Data)
    .then((data) => {
      console.log("data",data)
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      console.log("err",err)
      res.json(err);
    });
});


router.post('/updateUserProfile', upload.any(), function (req, res) {
  try {
    var Data = Common.isEmpty(req.body.Data) === false ? JSON.parse(req.body.Data) : req.body;
    var ProfilePhoto = req.files && req.files.length ? req.files[0].filename : '';

    // Combine Data and ProfilePhoto into a single parameter
    var data = {
      data: Data,
      ProfilePhoto: ProfilePhoto
    };

    AuthenticationCtrl.updateUserProfile(data)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/forgotPassword", function (req, res) {
  var Data = req.body;
  AuthenticationCtrl.forgotPassword(Data)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/userChangePassword", function (req, res) {
  var Data = req.body;
  AuthenticationCtrl.userChangePassword(Data)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/GetUpdateUserProfile", function (req, res) {
  var Data = req.body;
  AuthenticationCtrl.GetUpdateUserProfile(Data)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

// router.post("/forgotPassword", function (req, res) {
//   var Data = req.body;
//   AuthenticationCtrl.forgotPassword(Data)
//     .then((data) => {
//       if (data) {
//         res.json(data);
//       }
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

router.post("/resetPassword", function (req, res) {
  var Data = req.body;
  AuthenticationCtrl.resetPassword(Data)
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
