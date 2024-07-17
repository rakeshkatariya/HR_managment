/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import APIConstant from "../../utils/PathConstants";
import { apiBase } from "../../utils/config";
import CommonConfig from "../../utils/constant";
import api from "../../utils/apiClient";
import Toast from "../Shared/Toast/Toast";
import Loader from "../Shared/Loader/Loader";
import userImage from "../../assets/images/UserImage.png";
import { useHistory } from "react-router-dom";

const initialState = {
  securityUserID: "",
  firstName: "",
  firstNameErr: false,
  firstNameErrText: "",

  lastName: "",
  lastNameErr: false,
  lastNameErrText: "",

  email: "",
  emailErr: false,
  emailErrText: "",

  phone: "",
  phoneErr: false,
  phoneErrText: "",

  address: "",
  addressErr: false,
  addressErrText: "",
  userID: "",
  PicturePath: "",
  click: 0,
  imgSrc: "",
  image: "",
  isimageErr: "",
  isimagehelperText: "",
  loaded: false,
};
const SERVER_PATH = apiBase;
export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.state = {
      securityUserID: CommonConfig.loginData().UserId || "",
      //   firstName: CommonConfig.loginData().FirstName || "",
      //   lastName: CommonConfig.loginData().LastName || "",
      //   email: CommonConfig.loginData().EmailId || "",
      //   phone: CommonConfig.loginData().MobileNumber || "",
      //   address: CommonConfig.loginData().Address || "",
    };
  }

  componentDidMount = async () => {
    this.getUserProfileByID();
  };

  resetScreen = () => {
    this.setState(initialState);
  };

  handleChange = (e, type) => {
    if (type === "firstName") {
      if (CommonConfig.isEmpty(e.target.value)) {
        this.setState({
          firstName: e.target.value,
          firstNameErr: true,
          firstNameErrText: "Please enter first name",
        });
      } else {
        this.setState({
          firstName: e.target.value,
          firstNameErr: false,
          firstNameErrText: "",
        });
      }
    }
    if (type === "lastName") {
      if (CommonConfig.isEmpty(e.target.value)) {
        this.setState({
          lastName: e.target.value,
          lastNameErr: true,
          lastNameErrText: "Please enter last name",
        });
      } else {
        this.setState({
          lastName: e.target.value,
          lastNameErr: false,
          lastNameErrText: "",
        });
      }
    }
    if (type === "email") {
      if (CommonConfig.isEmpty(e.target.value)) {
        this.setState({
          email: e.target.value,
          emailErr: true,
          emailErrText: "Please enter email",
        });
      } else {
        this.setState({
          email: e.target.value,
          emailErr: false,
          emailErrText: "",
        });
      }
    }
    if (type === "phone") {
      if (CommonConfig.isEmpty(e.target.value)) {
        this.setState({
          phone: e.target.value,
          phoneErr: true,
          phoneErrText: "Please enter mobile number",
        });
      } else {
        this.setState({
          phone: e.target.value,
          phoneErr: false,
          phoneErrText: "",
        });
      }
    }
    if (type === "address") {
      if (CommonConfig.isEmpty(e.target.value)) {
        this.setState({
          address: e.target.value,
          addressErr: true,
          addressErrText: "Please enter address",
        });
      } else {
        this.setState({
          address: e.target.value,
          addressErr: false,
          addressErrText: "",
        });
      }
    }
  };

  validate = (e) => {
    let isValid = true;
    if (this.state.firstName === "" || this.state.firstName === null) {
      this.setState({
        firstNameErr: true,
        firstNameErrText: "First name is required ",
      });
      isValid = false;
    } else {
      this.setState({ firstNameErr: false, firstNameErrText: "" });
    }

    if (this.state.lastName === "" || this.state.lastName === null) {
      this.setState({
        lastNameErr: true,
        lastNameErrText: "Last name is required",
      });
      isValid = false;
    } else {
      this.setState({ lastNameErr: false, lastNameErrText: "" });
    }

    if (this.state.email === "" || this.state.email === null) {
      this.setState({ emailErr: true, emailErrText: "Email is required" });
      isValid = false;
    } else if (!this.state.email.match(CommonConfig.RegExp.email)) {
      this.setState({ emailErr: true, emailErrText: "Email  is not valid" });
      isValid = false;
    } else {
      this.setState({ emailIDErr: false, emailIDErrText: "" });
    }

    if (this.state.phone === "" || this.state.phone === null) {
      this.setState({ phoneErr: true, phoneErrText: "Phone is required" });
      isValid = false;
    } else if (!this.state.phone.match(CommonConfig.RegExp.phone)) {
      this.setState({ phoneErr: true, phoneErrText: "Phone  is not valid" });
      isValid = false;
    } else {
      this.setState({ phoneErr: false, phoneErrText: "" });
    }

    if (this.state.address === "" || this.state.address === null) {
      this.setState({
        addressErr: true,
        addressErrText: "Address is required",
      });
      isValid = false;
    } else {
      this.setState({ addressErr: false, addressErrText: "" });
    }
    return isValid;
  };

  getUserProfileByID = async () => {
    Loader.show();
    let data = {
      UserID: CommonConfig.loginData().UserId,
    };
    try {
      api
        .post(APIConstant.path.getUserProfileByID, data)
        .then(async (res) => {
          let response = await res;
          if (response.success) {
            Loader.hide();
            let profileImageObject;
            // let filePath = response.data.recordset[0].ProfilePhoto;
            let filePath = `${SERVER_PATH}/${response.data.recordset[0].ProfilePhoto}`;
            console.log("photo", filePath);
            if (!CommonConfig.isEmpty(filePath)) {
              let convertedBase64Media =
                CommonConfig.convertImgToBase64(filePath);
              await convertedBase64Media.then(async (dataUrl) => {
                let fileData = CommonConfig.base64toFile(
                  await dataUrl,
                  CommonConfig.findFileNameFromURL(filePath)
                );
                var reader = new FileReader();
                var url = reader.readAsDataURL(fileData);
                reader.onloadend = function (e) {
                  this.setState({
                    imgSrc: [reader.result],
                  });
                }.bind(this);
                if (fileData) {
                  profileImageObject = fileData;
                }
              });
            }

            this.setState({
              image: profileImageObject,
              userID: response.data.recordset[0].UserId,
              email: response.data.recordset[0].EmailId,
              phone: response.data.recordset[0].MobileNumber,
              lastName: response.data.recordset[0].LastName,
              firstName: response.data.recordset[0].FirstName,
              address: response.data.recordset[0].Address,
            });
          } else {
            Loader.hide();
          }
        })
        .catch((err) => {});
    } catch (err) {}
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validate()) {
      try {
        const {
          securityUserID,
          firstName,
          lastName,
          password,
          email,
          phone,
          address,
          image,
        } = this.state;

        var formData = new FormData();
        let data = {
          UserId: securityUserID,
          FirstName: firstName,
          LastName: lastName,
          EmailId: email,
          MobileNumber: phone,
          Address: address,
        };
        formData.append("Data", JSON.stringify(data));
        formData.append("ProfilePhoto", image);

        console.log("formData", JSON.stringify(data));

        api
          .post(APIConstant.path.updateUserProfile, formData)
          .then((res) => {
            if (res.success) {
              this.props.history.push("/dashboard");
              this.setState(initialState);
              Toast.success({ message: res.message });
              this.resetScreen();
              Loader.hide();
            } else {
              Toast.error({ message: res.message });
              Loader.hide();
            }
          })
          .catch((err) => {});
      } catch (e) {}
    }
  };

  onImageChange = (event) => {
    event.preventDefault();
    var file = event.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    if (Number(file.size) < 1024000 || Number(file.size) === 1024000) {
      this.setState({ image: file, isimageErr: false, isimagehelperText: "" });
      reader.onloadend = function (e) {
        this.setState({
          imgSrc: [reader.result],
          click: 1,
        });
      }.bind(this);
      // this.forceUpdate();
    } else {
      this.setState({ image: this.state.PicturePath });
    }
  };

  onError = () => {
    this.setState({
      imgSrc: undefined,
    });
  };

  handleCancel = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    const {
      firstName,
      firstNameErr,
      firstNameErrText,
      lastName,
      lastNameErr,
      lastNameErrText,
      email,
      emailErr,
      emailErrText,
      phone,
      phoneErr,
      phoneErrText,
      address,
      addressErr,
      addressErrText,
      imgSrc,
    } = this.state;

    return (
      <div className="p-h-100 p-overflow-auto">
        <div className="p-grid">
          <div className="p-col-12 p-md-6 p-lg-4">
            <div className="p-position-relative p-p-0">
              <div className="profile-img">
                <img
                  src={CommonConfig.isEmpty(imgSrc) ? userImage : imgSrc}
                  width="150px"
                  alt="userImage"
                  onError={this.onError}
                />

                <label
                  htmlFor="edit_profile"
                  className="edit-profile-editImage p-d-flex p-jc-center p-ai-center"
                >
                  <i className="icon-edit"></i>
                </label>
                <input
                  type="file"
                  onChange={this.onImageChange}
                  style={{ visibility: "hidden" }}
                  className="filetype"
                  id="edit_profile"
                  accept="image/jpeg"
                />
              </div>
            </div>
          </div>
          <div className="p-col-12 p-md-6 p-lg-8">
            <div className="p-grid">
              <div className="p-col-12 p-md-6">
                <div className="floating-field">
                  <InputText
                    id="first name"
                    placeholder=" "
                    className={
                      "p-w-100 " + (firstNameErr ? "p-invalid block" : null)
                    }
                    type="text"
                    value={firstName}
                    onChange={(e) => this.handleChange(e, "firstName")}
                  />
                  <span class="bar"></span>
                  <label htmlFor="first name">First Name</label>
                  {firstNameErr ? (
                    <small className="p-error block">{firstNameErrText}</small>
                  ) : null}
                </div>
              </div>
              <div className="p-col-12 p-md-6">
                <div className="floating-field">
                  <InputText
                    id="last name"
                    placeholder=" "
                    className={
                      "p-w-100 " + (lastNameErr ? "p-invalid block" : null)
                    }
                    type="text"
                    value={lastName}
                    onChange={(e) => this.handleChange(e, "lastName")}
                  />
                  <span class="bar"></span>
                  <label htmlFor="last name">Last Name</label>
                  {lastNameErr ? (
                    <small className="p-error block">{lastNameErrText}</small>
                  ) : null}
                </div>
              </div>
              <div className="p-col-12 p-md-6">
                <div className="floating-field">
                  <InputText
                    id="email"
                    placeholder=" "
                    className={
                      "p-w-100 " + (emailErr ? "p-invalid block" : null)
                    }
                    type="text"
                    value={email}
                    onChange={(e) => this.handleChange(e, "email")}
                  />
                  <span class="bar"></span>
                  <label htmlFor="email">Email Address</label>
                  {emailErr ? (
                    <small className="p-error block">{emailErrText}</small>
                  ) : null}
                </div>
              </div>
              <div className="p-col-12 p-md-6">
                <div className="floating-field">
                  <InputText
                    id="phone"
                    placeholder=" "
                    className={
                      "p-w-100 " + (phoneErr ? "p-invalid block" : null)
                    }
                    type="text"
                    value={phone}
                    onChange={(e) => this.handleChange(e, "phone")}
                  />
                  <span class="bar"></span>
                  <label htmlFor="phone">mobile number</label>
                  {phoneErr ? (
                    <small className="p-error block">{phoneErrText}</small>
                  ) : null}
                </div>
              </div>
              <div className="p-col-12 p-md-6">
                <div className="floating-field">
                  <InputText
                    id="address"
                    placeholder=" "
                    className={
                      "p-w-100 " + (addressErr ? "p-invalid block" : null)
                    }
                    type="text"
                    value={address}
                    onChange={(e) => this.handleChange(e, "address")}
                  />
                  <span class="bar"></span>
                  <label htmlFor="address">Address</label>
                  {addressErr ? (
                    <small className="p-error block">{addressErrText}</small>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-d-flex p-ai-center p-jc-end p-px-2">
          <button
            className="btn-text-action-secondary p-mr-2"
            onClick={(e) => this.handleCancel(e)}
          >
            Cancel
          </button>
          {/* <button
            className="btn-text-action-secondary"
            onClick={(e) => this.resetScreen()}
          >
            Reset
          </button> */}
          <button
            className="btn-text-action-primary p-ml-2"
            onClick={(e) => this.handleSubmit(e)}
          >
            submit
          </button>
        </div>
      </div>
    );
  }
}
