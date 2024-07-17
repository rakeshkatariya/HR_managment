var express = require('express');
var router = express.Router();

router.loginSuccessfullyMsg = "login Successfull"
router.UserNotFound = 'User Not Found';
router.userAddedSuccessful = 'User Added successfully';
router.userNameAlreadyExist = 'UserName already exist in system';
router.EmailNotVerifiedMsg = 'Email is not verified';
router.emailAlreadyExist = 'Email ID already exist in system';
router.phoneAlreadyExist = 'Phone Number already exist in system';
router.getDateTimeAmFormat = 'DD-MM-YYYY hh:mm A';
router.getDateTimeFormat = 'DD-MM-YYYY HH:mm';
router.getDateFormat = 'DD-MM-YYYY';
router.getDateTimeFormatted = 'YYYY-MM-DD HH:mm:ss';
router.saveSuccessMsg = 'Data Saved Successfully';
router.updateSuccessMsg = 'Data Updated Successfully';
router.ExceptionMsg = 'oops! Something went wrong';
router.RegisterEntityType = "Register";
router.ClientEntityType = "Client";

router.getResponseData = function (err, response) {
    var responseData = {};
    if (err) {
        responseData.success = false;
        responseData.data = {};
        responseData.data.errorMessage = response;
    }
    else {
        responseData.success = true;
        if (Array.isArray(response)) responseData.count = response.length;
        responseData.data = response;
    }
    return responseData;
};

router.getActiveStatus = function () {
    return 'Active';
}

router.getInactiveStatus = function () {
    return 'Inactive';
}

router.isEmpty = function (value) {

    if (value == undefined || value == null || value == '') {
        return true;
    } else {
        return false;
    }
}

router.generateOTP = function (len, arr) {
    var ans = '';
    for (var i = len; i > 0; i--) {
        ans +=
            arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
}
router.isEmpty = function (value) {
    if (value === undefined || value === null || value === '') {
        return true;
    } else {
        if (typeof value === 'string') {
            return value.trim() === "";
        } else {
            return false;
        }
    }
}

router.isObjectEmpty = function (obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


router.getMailAuthentication = function () {
    return {
        user: '',
        pass: ''
    }
}

module.exports = router;