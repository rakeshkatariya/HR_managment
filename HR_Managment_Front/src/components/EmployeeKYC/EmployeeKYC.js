/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import api from "../../utils/apiClient";
import CommonConfig from "../../utils/constant";
import APIConstant from "../../utils/PathConstants";
// import { FileUpload } from "primereact/fileupload";
import Toast from "../Shared/Toast/Toast";
import Loader from "../Shared/Loader/Loader";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useHistory } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.css';

const EmployeeKYC = (props) => {
  const [employeeKYCId, setEmployeeKYCId] = useState(null);
  const [securityUserID, setSecurityUserID] = useState(null);

  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [nameErrText, setNameErrText] = useState("");

  const [birthDate, setBirthDate] = useState("");
  const [birthDateErr, setBirthDateErr] = useState(false);
  const [birthDateErrText, setBirthDateErrText] = useState("");

  const [mobileNo, setMobileNo] = useState("");
  const [mobileNoErr, setMobileNoErr] = useState(false);
  const [mobileNoErrText, setMobileNoErrText] = useState("");

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrText, setEmailErrText] = useState("");

  const [address, setAddress] = useState("");
  const [addressErr, setAddressErr] = useState(false);
  const [addressErrText, setAddressErrText] = useState("");

  const [photo, setPhoto] = useState("");
  const [photoErr, setPhotoErr] = useState(false);
  const [photoErrText, setPhotoErrText] = useState("");

  const [aadharCard, setAadharCard] = useState("");
  const [aadharCardErr, setAadharCardErr] = useState(false);
  const [aadharCardErrText, setAadharCardErrText] = useState("");
  const history = useHistory();

  useEffect(() => {
    const loginData = CommonConfig.loginData();
    setSecurityUserID(loginData?.UserId);
  }, []);

  const resetScreen = async () => {
    // setSecurityUserID(null);
    setEmployeeKYCId(null);
    setName("");
    setNameErr(false);
    setNameErrText("");

    setBirthDate("");
    setBirthDateErr(false);
    setBirthDateErrText("");

    setMobileNo("");
    setMobileNoErr(false);
    setMobileNoErrText("");

    setEmail("");
    setEmailErr(false);
    setEmailErrText("");

    setAddress("");
    setAddressErr(false);
    setAddressErrText("");

    setPhoto("");
    setPhotoErr(false);
    setPhotoErrText("");

    setAadharCard("");
    setAadharCardErr(false);
    setAadharCardErrText("");
  };

  const handleChange = (e, type) => {
    if (type === "name") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setName("");
        setNameErr(true);
        setNameErrText("Name is required");
      } else {
        setName(e.target.value);
        setNameErr(false);
        setNameErrText("");
      }
    }
    if (type === "birthDate") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setBirthDate("");
        setBirthDateErr(true);
        setBirthDateErrText("Birth date is required");
      } else {
        setBirthDate(e.target.value);
        setBirthDateErr(false);
        setBirthDateErrText("");
      }
    }
    if (type === "mobileNo") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setMobileNo("");
        setMobileNoErr(true);
        setMobileNoErrText("Mobile number is required");
      } else {
        setMobileNo(e.target.value);
        setMobileNoErr(false);
        setMobileNoErrText("");
      }
    }
    if (type === "email") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setEmail("");
        setEmailErr(true);
        setEmailErrText("Email Id is required");
      } else {
        setEmail(e.target.value);
        setEmailErr(false);
        setEmailErrText("");
      }
    }
    if (type === "address") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setAddress("");
        setAddressErr(true);
        setAddressErrText("Address is required");
      } else {
        setAddress(e.target.value);
        setAddressErr(false);
        setAddressErrText("");
      }
    }
    if (type === 'photo') {
        if (CommonConfig.isEmpty(e.target.value)) {
            setPhoto("");
            setPhotoErr(true);
            setPhotoErrText("photo is required")
        } else {
            setPhoto(e.target.value);
            setPhotoErr(false);
            setPhotoErrText("");
        }
    }
    if (type === 'aadharCard') {
        if (CommonConfig.isEmpty(e.target.value)) {
            setAadharCard("");
            setAadharCardErr(true);
            setAadharCardErrText("Aadhar card is required")
        } else {
            setAadharCard(e.target.value);
            setAadharCardErr(false);
            setAadharCardErrText("");
        }
    }
  };

  const handleClose = async (type) => {
    if (type === "AddEmployeeKYC") {
      resetScreen();
      history.push("/dashboard");
    }
  };

  const validation = () => {
    let IsformValid = true;

    if (CommonConfig.isEmpty(name)) {
      setNameErr(true);
      setNameErrText("Name is required");
      IsformValid = false;
    } else {
      setNameErr(false);
      setNameErrText("");
    }
    if (CommonConfig.isEmpty(email)) {
      setEmailErr(true);
      setEmailErrText("Email ID is required");
      IsformValid = false;
    } else {
      setEmailErr(false);
      setEmailErrText("");
    }
    if (CommonConfig.isEmpty(birthDate)) {
      setBirthDateErr(true);
      setBirthDateErrText("Birth date is required");
      IsformValid = false;
    } else {
      setBirthDateErr(false);
      setBirthDateErrText("");
    }
    if (CommonConfig.isEmpty(address)) {
      setAddressErr(true);
      setAddressErrText("Address is required");
      IsformValid = false;
    } else {
      setAddressErr(false);
      setAddressErrText("");
    }
    if (CommonConfig.isEmpty(mobileNo)) {
      setMobileNoErr(true);
      setMobileNoErrText("Mobile number is required");
      IsformValid = false;
    } else {
      setMobileNoErr(false);
      setMobileNoErrText("");
    }
    if (CommonConfig.isEmpty(photo)) {
      setPhotoErr(true);
      setPhotoErrText("Profile photo is required");
      IsformValid = false;
    } else {
      setPhotoErr(false);
      setPhotoErrText("");
    }
    if (CommonConfig.isEmpty(aadharCard)) {
      setAadharCardErr(true);
      setAadharCardErrText("Aadhar card is required");
      IsformValid = false;
    } else {
      setAadharCardErr(false);
      setAadharCardErrText("");
    }

    return IsformValid;
  };

  const AddUpdateEmployee = async (e) => {
    e.preventDefault();
    if (validation()) {
      Loader.show();
      var formData = new FormData();
      let data = {
        EmployeeKYCId:'',
        UserId:securityUserID, 
        Name:name,
        BirthDate:birthDate, 
        MobileNo:mobileNo, 
        Email:email,
        Address:address, 
      };
        formData.append('Data', JSON.stringify(data));
        formData.append('Photo', photo.length ? photo[0]?.file : []);
        formData.append('AadharCard', aadharCard.length ? aadharCard[0]?.file : []);

        console.log("formData", formData);
      try {
        api
          .post(APIConstant.path.EmployeeKYC, formData)
          .then((res) => {
            if (res.success) {
              Toast.success({ message: res.message });
              Loader.hide();
              resetScreen();
            } else {
              Toast.error({ message: res.message });
              Loader.hide();
            }
          })
          .catch((err) => {
            Toast.error({ message: err });
            Loader.hide();
          });
      } catch (err) {
        Toast.error({ message: err });
        Loader.hide();
      }
    }
  };

  return (
    <div className="user-container">
      <div className="card-header">
        <div className="card-title p-d-lg-flex p-ai-center p-w-100">
          <h3 className="p-mb-3 p-mb-lg-0">Employee KYC</h3>
        </div>
      </div>
      <div>
        <div className="card-body">
          <div className="form-area">
            <div className={"p-grid"}>
              <div className="p-col-12 p-md-4 p-pt-2">
                <div className="p-w-100 ">
                  <div className="custom-inputs">
                    <label htmlFor="name">
                      Employee name <span style={{ color: "red" }}>*</span>:{" "}
                    </label>
                    <InputText
                      className="p-w-100 p-mt-2"
                      id="name"
                      type="text"
                      placeholder="Name"
                      value={name}
                      autoFocus={true}
                      onChange={(e) => handleChange(e, "name")}
                      maxLength={30}
                    />
                  </div>
                  <span className="error-msg" style={{ color: "red" }}>
                    {nameErr ? nameErrText : null}
                  </span>
                </div>
              </div>

              <div className="p-col-12 p-md-4 p-pt-2">
                <div className="p-w-100 ">
                  <div className="custom-inputs">
                    <label htmlFor="mobileNo">
                      Mobile number <span style={{ color: "red" }}>*</span>:{" "}
                    </label>
                    <InputText
                      className="p-w-100 p-mt-2"
                      id="mobileNo"
                      type="text"
                      placeholder="Mobile number"
                      value={mobileNo}
                      onChange={(e) => handleChange(e, "mobileNo")}
                      maxLength={10}
                      keyfilter={"num"}
                    />
                  </div>
                  <span className="error-msg" style={{ color: "red" }}>
                    {mobileNoErr ? mobileNoErrText : null}
                  </span>
                </div>
              </div>

              <div className="p-col-12 p-md-4 p-pt-2">
                <div className="p-w-100 ">
                  <div className="custom-inputs">
                    <label htmlFor="email">
                      Email ID <span style={{ color: "red" }}>*</span>:{" "}
                    </label>
                    <InputText
                      className="p-w-100 p-mt-2"
                      id="email"
                      type="text"
                      placeholder="Example123@example.com"
                      value={email}
                      onChange={(e) => handleChange(e, "email")}
                      keyfilter={"email"}
                    />
                  </div>
                  <span className="error-msg" style={{ color: "red" }}>
                    {emailErr ? emailErrText : null}
                  </span>
                </div>
              </div>

              <div className="p-col-12 p-md-4 p-pt-2">
                <div className="p-w-100 ">
                  <div className="custom-inputs">
                    <span className="fromedate-field custom-inputs p-input-icon-right">
                      <label htmlFor="birthDate">
                        Birth Date <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <Calendar
                        className="p-w-100 p-mt-0"
                        id="birthDate"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        value={birthDate}
                        onChange={(e) => handleChange(e, "birthDate")}
                        dateFormat="dd/mm/yy"
                        // showIcon
                      />
                      {/* <i
                        className="pi pi-calendar"
                        style={{
                          fontSize: "1.2rem",
                          color: "#007ad9",
                        }}
                      ></i> */}
                    </span>
                  </div>
                  <span className="error-msg" style={{ color: "red" }}>
                    {birthDateErr ? birthDateErrText : null}
                  </span>
                </div>
              </div>

              <div className="p-col-12 p-md-4 p-pt-2">
                <div className="p-w-100 ">
                  <div className="custom-inputs">
                    <label htmlFor="address">
                      Address <span style={{ color: "red" }}>*</span>:{" "}
                    </label>
                    <InputText
                      className="p-w-100 p-mt-2"
                      id="address"
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => handleChange(e, "address")}
                      // maxLength={30}
                    />
                  </div>
                  <span className="error-msg" style={{ color: "red" }}>
                    {addressErr ? addressErrText : null}
                  </span>
                </div>
              </div>

              <div className="p-col-12 p-md-4 p-pt-2">
                <div className="p-w-100 ">
                  <div className="custom-inputs">
                    <label htmlFor="photo">
                      Profile Photo<span style={{ color: "red" }}>*</span>:
                    </label>
                    <span className="bg-gray-200 p-4 rounded-md">
                      <FilePond
                        files={photo}
                        allowMultiple={false}
                        acceptedFileTypes={["Photo/pdf", "image/*"]}
                        maxFileSize="5MB"
                        name="files"
                        labelIdle={
                          'Images/PDF (max size 5MB) <span class="block filepond--label-action">Browse</span>'
                        }
                        onupdatefiles={setPhoto}
                        maxFiles={1}
                        className="w-full"
                      />
                    </span>
                  </div>
                  <span className="error-msg" style={{ color: "red" }}>
                    {photoErr ? photoErrText : null}
                  </span>
                </div>
              </div>
              <div className="p-col-12 p-md-4 p-pt-0">
                <div className="p-w-100 ">
                  <div className="custom-inputs">
                    <label htmlFor="aadharCard">
                      Aadhar Card <span style={{ color: "red" }}>*</span>:
                    </label>
                    <span className="bg-gray-200 p-4 rounded-md">
                      <FilePond
                        files={aadharCard}
                        allowMultiple={false}
                        acceptedFileTypes={["Aadhar Card/pdf", "image/*"]}
                        maxFileSize="5MB"
                        name="files"
                        labelIdle={
                          'Images/PDF (max size 5MB) <span class="block filepond--label-action">Browse</span>'
                        }
                        onupdatefiles={setAadharCard}
                        maxFiles={1}
                        className="w-full"
                      />
                    </span>
                  </div>
                  <span className="error-msg" style={{ color: "red" }}>
                    {aadharCardErr ? aadharCardErrText : null}
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <div className="dialog-footer">
              <Button
                className="btn-dialog-submit p-mr-2"
                severity="secondary"
                raised
                onClick={(e) => AddUpdateEmployee(e)}
                style={{ height: "35px" }}
              >
                Submit
              </Button>
              <Button
                className="btn-dialog-cancel"
                onClick={(e) => handleClose("AddEmployeeKYC")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployeeKYC;
