/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import logo from "../../assets/svgs/logo.svg";
import zeroSVG from "../../assets/svgs/ZeroLogin.svg";
import api from "../../utils/apiClient";
import CommonConfig from "../../utils/constant";
import APIConstant from "../../utils/PathConstants";
import Toast from "../Shared/Toast/Toast";
import Loader from "../Shared/Loader/Loader";
import { useState } from "react";

const intialState = {
  userRoleList: [],
  firstName: "",
  firstNameErr: false,
  firstNameErrText: "",

  lastName: "",
  lastNameErr: false,
  lastNameErrText: "",

  password: "",
  passwordErr: false,
  passwordErrText: "",

  emailId: "",
  emailIdErr: false,
  emailIdErrText: "",

  mobileNumber: "",
  mobileNumberErr: false,
  mobileNumberErrText: "",

  address: "",
  addressErr: false,
  addressErrText: "",

  userType: "",
  userTypeErr: false,
  userTypeErrText: "",

  values: "",
  showPassword: false,
  isVerified: false,
  isVerifiedErr: false,
  isVerifiedErrText: "",
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = intialState;
  }

  componentDidMount = () => {
    // const loadScriptByURL = (id, url, callback) => {
    //   const isScriptExist = document.getElementById(id);
    //   if (!isScriptExist) {
    //     var script = document.createElement("script");
    //     script.type = "text/javascript";
    //     script.src = url;
    //     script.id = id;
    //     script.onload = function () {
    //       if (callback) callback();
    //     };
    //     document.body.appendChild(script);
    //   }
    //   if (isScriptExist && callback) callback();
    // };
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  handleChange = (e, type) => {
    if (type === "firstName") {
      if (CommonConfig.isEmpty(e.target.value)) {
        this.setState({
          firstName: "",
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
    } else if (type === "lastName") {
      if (CommonConfig.isEmpty(e.target.value)) {
        this.setState({
          lastName: "",
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
    if (type === "password") {
      if (CommonConfig.isEmpty(e.target.value)) {
        this.setState({
          password: "",
          passwordErr: true,
          passwordErrText: "Please enter password",
        });
      } else {
        this.setState({
          password: e.target.value,
          passwordErr: false,
          passwordErrText: "",
        });
      }
    }
    if (type === "emailId") {
      if (CommonConfig.isEmpty(e.target.value)) {
        this.setState({
          emailId: "",
          emailIdErr: true,
          emailIdErrText: "Please enter email",
        });
      } else {
        this.setState({
          emailId: e.target.value,
          emailIdErr: false,
          emailIdErrText: "",
        });
      }
    }
    if (type === "mobileNumber") {
      if (CommonConfig.isEmpty(e.target.value)) {
        this.setState({
          mobileNumber: "",
          mobileNumberErr: true,
          mobileNumberErrText: "Please enter mobile number",
        });
      } else {
        this.setState({
          mobileNumber: e.target.value,
          mobileNumberErr: false,
          mobileNumberErrText: "",
        });
      }
    }
    if (type === "address") {
      if (CommonConfig.isEmpty(e.target.value)) {
        this.setState({
          address: "",
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
    if (type === "userType") {
      if (CommonConfig.isEmpty(e.target.value)) {
        this.setState({
          userType: "",
          userTypeErr: true,
          userTypeErrText: "User type is required",
        });
      } else {
        this.setState({
          userType: e.target.value,
          userTypeErr: false,
          userTypeErrText: "",
        });
      }
    }
  };

  validate = (e) => {
    let formIsValid = true;
    if (this.state.firstName === "" || this.state.firstName === null) {
      this.setState({
        firstNameErr: true,
        firstNameErrText: "First name is required",
      });
      formIsValid = false;
    } else {
      this.setState({ firstNameErr: false, firstNameErrText: "" });
    }
    if (this.state.lastName === "" || this.state.lastName === null) {
      this.setState({
        lastNameErr: true,
        lastNameErrText: "Last name is required",
      });
      formIsValid = false;
    } else {
      this.setState({ lastNameErr: false, lastNameErrText: "" });
    }

    if (this.state.password === "" || this.state.password === null) {
      this.setState({
        passwordErr: true,
        passwordErrText: "Password is required",
      });
      formIsValid = false;
    } else {
      this.setState({ passwordErr: false, passwordErrText: "" });
    }
    if (this.state.emailId === "" || this.state.emailId === null) {
      this.setState({ emailIdErr: true, emailIdErrText: "Email is required" });
      formIsValid = false;
    } else if (!this.state.emailId.match(CommonConfig.RegExp.email)) {
      this.setState({
        firstNameErr: true,
        emailIdErrText: "Email  is not valid",
      });
      Toast.error({ message: "Invalid credentials" });
      formIsValid = false;
    } else {
      this.setState({ emailIdErr: false, emailIdErrText: "" });
    }
    if (this.state.mobileNumber === "" || this.state.mobileNumber === null) {
      this.setState({
        mobileNumberErr: true,
        mobileNumberErrText: "Mobile number is required",
      });
      formIsValid = false;
    } else if (
      !this.state.mobileNumber.match(CommonConfig.RegExp.phoneNumber)
    ) {
      this.setState({
        firstNameErr: true,
        mobileNumberErrText: "Mobile number  is not valid",
      });
      Toast.error({ message: "Invalid credentials" });
      formIsValid = false;
    } else {
      this.setState({ mobileNumberErr: false, mobileNumberErrText: "" });
    }
    if (this.state.address === "" || this.state.address === null) {
      this.setState({
        addressErr: true,
        addressErrText: "Address is required",
      });
      formIsValid = false;
    } else {
      this.setState({ addressErr: false, addressErrText: "" });
    }
    // if (this.state.userType === "" || this.state.userType === null) {
    //     this.setState({ userTypeErr: true, userTypeErrText: 'User type is required' });
    //     formIsValid = false;
    // }
    // else {
    //     this.setState({ userTypeErr: false, userTypeErrText: '' });
    // }
    // if (this.state.isVerified) {
    //     this.setState({ isVerifiedErr: false });
    // }
    // else {
    //     this.setState({ isVerifiedErr: true });
    //     formIsValid = false;
    // }
    return formIsValid;
  };

  handleRegister = async (e) => {
    e.preventDefault();
    if (this.validate()) {
      Loader.show();
      const { firstName, lastName, password, emailId, mobileNumber, address } =
        this.state;
      let data = {
        UserId: "",
        FirstName: firstName,
        LastName: lastName,
        EmailId: emailId,
        Password: password,
        MobileNumber: mobileNumber,
        Address: address,
        // UserType: userType,
      };
      console.log("data", data);
      try {
        api
          .post(APIConstant.path.RegisterUser, data)
          .then((Response) => {
            if (Response.success) {
              Loader.hide();
              this.props.history.push("/");
              Toast.success({ message: Response.message });
            } else {
              Loader.hide();
              Toast.error({ message: Response.message });
            }
          })
          .catch((err) => {
            Loader.hide();
            Toast.error({ message: err });
          });
      } catch (err) {
        Loader.hide();
        Toast.error({ message: err });
      }
    }
  };

  handleEnter1(event) {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 2].focus();
      event.preventDefault();
    }
  }

  render() {
    return (
      <div>
        <div className="p-grid auth-background">
          <div className="p-col-0 p-md-0 p-lg-5 p-p-0">
            <div className="main-img">{/* <img src={zeroSVG} /> */}</div>
          </div>
          <div className="p-col-12 p-md-12 p-lg-7 p-p-0">
            <div className="login-container">
              <div className="p-w-100">
                <div className="p-text-center p-w-100">
                  <div className="logo">
                    {/* <img src={logo} alt="CrevisLogo" /> */}
                  </div>
                  <div className="login-description">
                    {/* Welcome to Crevis Coal
                    Quality Evolution System */}
                  </div>
                </div>

                <form onSubmit={(e) => this.handleLogin(e)}>
                  <div className="form-area">
                    <div className="login-tag-line">
                      Please <span>Register</span> to your account
                    </div>
                    <div className="p-w-100 p-mt-4">
                      <span className="custom-inputs p-mb-2">
                        <i
                          className="pi pi-user"
                          style={{ fontSize: "1em", marginRight: "0.5em" }}
                        />
                        <label
                          htmlFor="firstName"
                          style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                        >
                          First Name<span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText
                          id="firstName"
                          placeholder="First Name"
                          className={
                            this.state.firstNameErr
                              ? "p-w-100 p-invalid block"
                              : "p-w-100"
                          }
                          type="text"
                          value={this.state.firstName}
                          onChange={(e) => this.handleChange(e, "firstName")}
                        />
                      </span>
                      <span className="error-msg">
                        {this.state.firstNameErr
                          ? CommonConfig.showErrorMsg(
                              this.state.firstNameErrText
                            )
                          : null}
                      </span>
                    </div>

                    <div className="p-w-100 p-mt-4">
                      <span className="custom-inputs p-mb-2">
                        <i
                          className="pi pi-user"
                          style={{ fontSize: "1em", marginRight: "0.5em" }}
                        />
                        <label
                          htmlFor="lastName"
                          style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                        >
                          Last Name<span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText
                          id="lastName"
                          placeholder="Last Name"
                          className={
                            this.state.lastNameErr
                              ? "p-w-100 p-invalid block"
                              : "p-w-100"
                          }
                          type="text"
                          value={this.state.lastName}
                          onChange={(e) => this.handleChange(e, "lastName")}
                        />
                      </span>
                      <span className="error-msg">
                        {this.state.lastNameErr
                          ? CommonConfig.showErrorMsg(
                              this.state.lastNameErrText
                            )
                          : null}
                      </span>
                    </div>

                    <div className="p-w-100 p-mt-4">
                      <span className="password-field custom-inputs p-input-icon-right">
                        <label
                          htmlFor="password"
                          style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                        >
                          Password<span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText
                          id="password"
                          placeholder="Password"
                          className={
                            this.state.passwordErr
                              ? "p-w-100 p-invalid block"
                              : "p-w-100"
                          }
                          type={this.state.showPassword ? "text" : "password"}
                          value={this.state.password}
                          onChange={(e) => this.handleChange(e, "password")}
                        />
                        <i
                          className={
                            this.state.showPassword
                              ? "icon-view tailer-icon"
                              : "icon-view-off tailer-icon"
                          }
                          onClick={this.togglePasswordVisibility}
                        ></i>
                      </span>
                      <span className="error-msg">
                        {this.state.passwordErr
                          ? CommonConfig.showErrorMsg(
                              this.state.passwordErrText
                            )
                          : null}
                      </span>
                    </div>
                    <div className="p-w-100 p-mt-4">
                      <span className="custom-inputs p-mb-2">
                        <i
                          className="pi pi-envelope"
                          style={{ fontSize: "1em", marginRight: "0.5em" }}
                        />
                        <label
                          htmlFor="emailId"
                          style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                        >
                          Email Id<span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText
                          id="emailId"
                          placeholder="Email Id"
                          className={
                            this.state.emailIdErr
                              ? "p-w-100 p-invalid block"
                              : "p-w-100"
                          }
                          type="text"
                          value={this.state.emailId}
                          onChange={(e) => this.handleChange(e, "emailId")}
                        />
                      </span>
                      <span className="error-msg">
                        {this.state.emailIdErr
                          ? CommonConfig.showErrorMsg(this.state.emailIdErrText)
                          : null}
                      </span>
                    </div>

                    <div className="p-w-100 p-mt-4">
                      <span className="custom-inputs p-mb-2">
                        <i
                          className="pi pi-mobile"
                          style={{ fontSize: "1em", marginRight: "0.5em" }}
                        />
                        <label
                          htmlFor="mobileNumber"
                          style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                        >
                          Mobile Number<span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText
                          id="mobileNumber"
                          placeholder="0123456789"
                          className={
                            this.state.mobileNumberErr
                              ? "p-w-100 p-invalid block"
                              : "p-w-100"
                          }
                          type="text"
                          value={this.state.mobileNumber}
                          onChange={(e) => this.handleChange(e, "mobileNumber")}
                          keyfilter={"num"}
                          maxLength={10}
                        />
                      </span>
                      <span className="error-msg">
                        {this.state.mobileNumberErr
                          ? CommonConfig.showErrorMsg(
                              this.state.mobileNumberErrText
                            )
                          : null}
                      </span>
                    </div>

                    <div className="p-w-100 p-mt-4">
                      <span className="custom-inputs p-mb-2">
                        <i
                          className="pi pi-map-marker"
                          style={{ fontSize: "1em", marginRight: "0.5em" }}
                        />
                        <label
                          htmlFor="address"
                          style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                        >
                          Address<span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText
                          id="address"
                          placeholder="Address"
                          className={
                            this.state.addressErr
                              ? "p-w-100 p-invalid block"
                              : "p-w-100"
                          }
                          type="text"
                          value={this.state.address}
                          onChange={(e) => this.handleChange(e, "address")}
                        />
                      </span>
                      <span className="error-msg">
                        {this.state.addressErr
                          ? CommonConfig.showErrorMsg(this.state.addressErrText)
                          : null}
                      </span>
                    </div>
                    <br />
                    <div className="p-w-100">
                      <button
                        type="submit"
                        className="login-btn"
                        onClick={(e) => this.handleRegister(e)}
                      >
                        <span
                          style={{ fontSize: "1.3em", marginRight: "0.5em" }}
                        >
                          Register Now
                        </span>
                      </button>
                    </div>
                    <div>
                      <p>
                        If you are already registered, please{" "}
                        <a href="/login">Login</a>.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
