var UserProfileCtrl = require("./../controller/UserProfileCtrl.js");
var express = require("express");
var Common = require("../common");

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
      "profile." +
      file.originalname.split(".").pop();
    console.log("filename", fileName);
    fileArray.push({ FileName: fileName });
    cb(null, fileName);
  },
});
var upload = multer({
  storage: Storage,
});
/** Code API */
router.post("/getUserProfileByID", function (req, res) {
  var Data = req.body;
  UserProfileCtrl.getUserProfileByID(Data)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/updateUserProfile", upload.any(), function (req, res) {
  try {
    var Data =
      Common.isEmpty(req.body.Data) === false
        ? JSON.parse(req.body.Data)
        : req.body;
    var ProfilePhoto =
      req.files && req.files.length ? req.files[0].filename : "";
    var data = {
      data: Data,
      ProfilePhoto: ProfilePhoto,
    };
    UserProfileCtrl.updateUserProfile(data)
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

router.post("/EmployeeKYC", upload.any(), function (req, res) {
  var Data =
    Common.isEmpty(req.body.Data) === false
      ? JSON.parse(req.body.Data)
      : req.body;
  var Photo = req.files && req.files.length ? req.files[0].filename : "";
  var AadharCard = req.files && req.files.length ? req.files[1].filename : "";
  //  fileArray = [];
  var data = {
    data: Data,
    Photo: Photo,
    AadharCard: AadharCard,
  };
  UserProfileCtrl.EmployeeKYC(data)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

// router.post('/EmployeeKYC', upload.any(), function (req, res) {
//   // var Data = req.body;

//   var Data = Common.isEmpty(req.body.Data) === false ? JSON.parse(req.body.Data) : req.body;
//   Data.Photo = fileArray.length && fileArray.filter(x=>x.DocumentType == "Photo").length ? fileArray.filter(x=>x.DocumentType == "Photo")[0].DocumentName : '';
//   Data.AadharCard = fileArray.length && fileArray.filter(x=>x.DocumentType == "AadharCard").length ? fileArray.filter(x=>x.DocumentType == "AadharCard")[0].DocumentName : '';
//     fileArray = [];

//     UserProfileCtrl.EmployeeKYC(Data).then((data) => {
//       if (Data) {
//           res.json(data);
//       }
//   }).catch((err) => {
//       res.json(err);
//   })
// });

// router.post('/userChangePassword', function (req, res) {
//     var Data = req.body;
//     console.log('asa',Data)

//     UserProfileCtrl.userChangePassword(Data).then((data) => {
//         if (data) {
//             res.json(data);
//         }
//     }).catch((err) => {
//         res.json(err);
//     });

// });

router.post("/userChangePassword", function (req, res) {
  var Data = req.body;
  UserProfileCtrl.userChangePassword(Data)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/GetUserList", function (req, res) {
  var Data = req.body;
  UserProfileCtrl.GetUserList(Data)
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
