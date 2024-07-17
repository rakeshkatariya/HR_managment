var express = require("express");
var Common = require("../common");
var CompanyEmployeeCtrl = require("./../controller/CompanyEmployeeCtrl");
var router = express.Router();
var moment = require("moment");
var multer = require("multer");
var fs = require("fs");

let fileArray = [];
var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dir = 'document/';
        //  + Common.PropertyMediaPath;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        // let inputData = Common.isEmpty(req.body.data) === false ? JSON.parse(req.body.data) : req.body;
        let fileName = moment().format('DD_MM_YYYY_HH_mm_ss') + "Policy-"+ file.fieldname+"." + file.originalname.split('.').pop();

        fileArray.push({ DocumentName: fileName, DocumentType : file.fieldname })
        cb(null, fileName);
    }
});
var upload = multer({
    storage: Storage
})

router.post('/AddUpdateCompanyEmployee', upload.any(), function (req, res) {
  // var Data = req.body;

  var Data = Common.isEmpty(req.body.Data) === false ? JSON.parse(req.body.Data) : req.body;
  Data.Photo = fileArray.length && fileArray.filter(x=>x.DocumentType == "Photo").length ? fileArray.filter(x=>x.DocumentType == "Photo")[0].DocumentName : '';
  Data.AadharCard = fileArray.length && fileArray.filter(x=>x.DocumentType == "AadharCard").length ? fileArray.filter(x=>x.DocumentType == "AadharCard")[0].DocumentName : '';

  fileArray = [];
  console.log("Data", Data);

  CompanyEmployeeCtrl.AddUpdateCompanyEmployee(Data).then((data) => {
      if (Data) {
          res.json(data);
      }
  }).catch((err) => {
      res.json(err);
  })
});

// router.post("/AddUpdateCompanyEmployee", upload.any(), function (req, res) {
//   var Data =
//     Common.isEmpty(req.body.Data) === false
//       ? JSON.parse(req.body.Data)
//       : req.body;
//   var Photo = req.files && req.files.length ? req.files[0].filename : "";
//   var AadharCard = req.files && req.files.length ? req.files[1].filename : "";
//   //  fileArray = [];
//   var data = {
//     data: Data,
//     Photo: Photo,
//     AadharCard: AadharCard,
//   };
//   CompanyEmployeeCtrl.AddUpdateCompanyEmployee(data)
//     .then((data) => {
//       if (data) {
//         res.json(data);
//       }
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });


router.post("/getCompanyEmployeeDataList", function (req, res) {
  var Data = req.body;
  CompanyEmployeeCtrl.getCompanyEmployeeDataList(Data)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/getEmployeeDataById", function (req, res) {
  var Data = req.body;
  CompanyEmployeeCtrl.getEmployeeDataById(Data)
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/DeleteCompanyEmployee", function (req, res) {
  var Data = req.body;
  CompanyEmployeeCtrl.DeleteCompanyEmployee(Data)
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
