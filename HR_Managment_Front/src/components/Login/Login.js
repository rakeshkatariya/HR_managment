import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import logo from "../../assets/svgs/logo.svg";
import zeroSVG from "../../assets/svgs/ZeroLogin.svg";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import api from "../../utils/apiClient";
import CommonConfig from "../../utils/constant";
import APIConstant from "../../utils/PathConstants";
import Toast from "../Shared/Toast/Toast";
import Loader from "../Shared/Loader/Loader";
import { useState } from "react";
import { Sidebar } from "primereact/sidebar";

const intialState = {
  checked: false,
  userNameErr: false,
  UserhelperText: "",
  userName: "",

  password: "",
  passwordErr: false,
  passwordhelperText: "",
  showPassword: false,
  showOldPassword: false,
  showNewPassword: false,
  showConfirmPassword: false,
  userType: "",

  mobileNumber: "",
  mobileNumberErr: false,
  mobileNumberErrText: "",

  oldPassword: "",
  oldPasswordErr: "",
  oldPasswordErrText: "",

  newPassword: "",
  newPasswordErr: "",
  newPasswordErrText: "",
  confirmPassword: "",
  confirmPasswordErr: "",
  confirmPasswordErrText: "",

  isVerified: false,
  isVerifiedErr: false,
  isVerifiedErrText: "",
  changePasswordModal: false,
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = intialState;

    // this.verifyCallback = this.verifyCallback.bind(this);
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

  handleCheck = (e, type) => {
    if (type === "userName") {
      let value = e.target.value;
      if (value === "" || value === null) {
        this.setState({
          userName: value,
          userNameErr: true,
          UserhelperText: "Username is required",
        });
      } else {
        this.setState({
          userName: value,
          userNameErr: false,
          UserhelperText: "",
        });
      }
    }
    if (type === "Password") {
      if (e.target.value === "" || e.target.value === null) {
        this.setState({
          password: e.target.value,
          passwordErr: true,
          passwordhelperText: "Password is required",
        });
      } else {
        this.setState({
          password: e.target.value,
          passwordErr: false,
          passwordhelperText: "",
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
    if (type === "oldPassword") {
      if (CommonConfig.isEmpty(e.target.value)) {
        this.setState({
          oldPassword: e.target.value,
          oldPasswordErr: true,
          oldPasswordErrText: "Old password is required",
        });
      } else {
        this.setState({
          oldPassword: e.target.value,
          oldPasswordErr: false,
          oldPasswordErrText: "",
        });
      }
    }
    if (type === "newPassword") {
      if (CommonConfig.isEmpty(e.target.value)) {
        this.setState({
          newPassword: e.target.value,
          newPasswordErr: true,
          newPasswordErrText: "New password is required",
        });
      } else {
        this.setState({
          newPassword: e.target.value,
          newPasswordErr: false,
          newPasswordErrText: "",
        });
      }
    }
    if (type === "confirmPassword") {
      if (CommonConfig.isEmpty(e.target.value)) {
        this.setState({
          confirmPassword: e.target.value,
          confirmPasswordErr: true,
          confirmPasswordErrText: "Confirm password is required",
        });
      } else if (this.state.newPassword !== e.target.value) {
        this.setState({
          confirmPassword: e.target.value,
          confirmPasswordErr: true,
          confirmPasswordErrText: "  Confirm password does not match ",
        });
      } else {
        this.setState({
          confirmPassword: e.target.value,
          confirmPasswordErr: false,
          confirmPasswordErrText: "",
        });
      }
    }
  };

  validate = (e) => {
    let formIsValid = true;
    if (this.state.userName === "" || this.state.userName === null) {
      this.setState({
        userNameErr: true,
        UserhelperText: "User name is required",
      });
      formIsValid = false;
    }
    // else if (!this.state.userName.match(CommonConfig.RegExp.email)) {
    //   this.setState({ userNameErr: true, UserhelperText: 'Email  is not valid' });
    //   Toast.error({ message: 'Invalid credentials' });
    //   formIsValid = false;
    // }
    else {
      this.setState({ userNameErr: false, UserhelperText: "" });
    }
    if (this.state.password === "" || this.state.password === null) {
      this.setState({
        passwordErr: true,
        passwordhelperText: "Password is required",
      });
      formIsValid = false;
    } else {
      this.setState({ passwordErr: false, passwordhelperText: "" });
    }
    // if (this.state.isVerified) {
    //   this.setState({ isVerifiedErr: false });
    // }
    // else {
    //   this.setState({ isVerifiedErr: true });
    //   formIsValid = false;
    // }
    return formIsValid;
  };

  changePsswordValidation = (e) => {
    let isValid = true;
    if (this.state.mobileNumber === "" || this.state.mobileNumber === null) {
      this.setState({
        mobileNumberErr: true,
        mobileNumberErrText: "Mobile number is required",
      });
      isValid = false;
    } else if (
      !this.state.mobileNumber.match(CommonConfig.RegExp.phoneNumber)
    ) {
      this.setState({
        firstNameErr: true,
        mobileNumberErrText: "Mobile number  is not valid",
      });
      Toast.error({ message: "Invalid credentials" });
      isValid = false;
    } else {
      this.setState({ mobileNumberErr: false, mobileNumberErrText: "" });
    }

    if (this.state.oldPassword === "" || this.state.oldPassword === null) {
      this.setState({
        oldPasswordErr: true,
        oldPasswordErrText: "Please enter old password",
      });
      isValid = false;
    } else {
      this.setState({ oldPasswordErr: false, oldPasswordErrText: "" });
    }

    if (this.state.newPassword === "" || this.state.newPassword === null) {
      this.setState({
        newPasswordErr: true,
        newPasswordErrText: "Please enter new password",
      });
      isValid = false;
    } else {
      this.setState({ newPasswordErr: false, newPasswordErrText: "" });
    }
    if (
      this.state.confirmPassword === "" ||
      this.state.confirmPassword === null
    ) {
      this.setState({
        confirmPasswordErr: true,
        confirmPasswordErrText: "Please enter new password",
      });
      isValid = false;
    } else {
      this.setState({ confirmPasswordErr: false, confirmPasswordErrText: "" });
    }
    if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({
        confirmPasswordErr: true,
        confirmPasswordErrText: "Confirm password does not match",
      });
      isValid = false;
    } else {
      this.setState({ confirmPasswordErr: false, confirmPasswordErrText: "" });
    }
    return isValid;
  };

  changePassword = (e) => {
    e.preventDefault();

    if (this.changePsswordValidation()) {
      try {
        let data = {
          MobileNumber: this.state.mobileNumber,
          OldPassword: this.state.oldPassword,
          NewPassword: this.state.newPassword,
        };
        api
          .post(APIConstant.path.ForgotPassword, data)
          .then((res) => {
            if (res.success) {
              this.setState(intialState);
              Toast.success({ message: res.message });
              this.resetScreen();
              Loader.hide();
            } else {
              Toast.error({ message: res.message });
              Loader.hide();
            }
          })
          .catch((err) => { });
      } catch (e) { }
    }
  };

  handleLogin = (e) => {
    e.preventDefault();
    if (this.validate(e)) {
      try {
        let data = {
          LoginID: this.state.userName,
          Password: this.state.password,
          // IsOTPLogin: false,
        };
        Loader.show();
        api
          .post(APIConstant.path.login, data)
          .then((res) => {
            // let res = response.Info.Login;
            if (res.success) {
              // localStorage.setItem('AccessToken', res.data?.accessToken);
              // localStorage.setItem('RefreshToken', res.data?.refreshToken);
              localStorage.setItem("loginData", JSON.stringify(res.data[0]));
              localStorage.setItem("isAuthorized", res.Success);
              Loader.hide();
              this.props.history.push("/dashboard");
              Toast.success({ message: res.message });
            } else {
              Toast.error({ message: res.message });
              Loader.hide();
            }
          })
          .catch((err) => {
            Loader.hide();
          });
      } catch (err) { }
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

  togglePasswordVisibility = (type) => {
    if (type === "Password") {
      this.setState((prevState) => ({
        showPassword: !prevState.showPassword,
      }));
    }
    if (type === "oldPassword") {
      this.setState((prevState) => ({
        showOldPassword: !prevState.showOldPassword,
      }));
    }
    if (type === "newPassword") {
      this.setState((prevState) => ({
        showNewPassword: !prevState.showNewPassword,
      }));
    }
    if (type === "confirmPassword") {
      this.setState((prevState) => ({
        showConfirmPassword: !prevState.showConfirmPassword,
      }));
    }
  };

  render() {
    const {
      changePasswordModal,
      oldPassword,
      newPassword,
      oldPasswordErr,
      oldPasswordErrText,
      newPasswordErr,
      newPasswordErrText,
      confirmPassword,
      confirmPasswordErr,
      confirmPasswordErrText,
    } = this.state;

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
                      Please <span>Login</span> to your account
                    </div> 
                    <div className="p-col-12 p-md-12 p-pt-2">
                      <div className="p-w-100 ">
                        <div className="custom-inputs">
                          {/* <label htmlFor="leaveType">Role :</label> */}
                          <div className="flex gap-3" style={{ display: "flex" }}>
                          <label htmlFor="leaveType" className=" p-pt-2">Role :</label>
                            <div className="flex align-items-center p-pt-2 p-ml-2">
                              <RadioButton
                                inputId="fullDay"
                                name="leaveType"
                                value="fullDay"
                                onChange={(e) => this.handleCheck(e, "leaveType")}
                                // checked={leaveType === "fullDay"}
                                className="mr-10"
                              />
                              <label htmlFor="fullDay" className="p-ml-2 ">
                                full Day
                              </label>
                            </div>
                            <div className="p-pt-2 p-ml-4">
                              <RadioButton
                                inputId="halfDay"
                                name="leaveType"
                                value="halfDay"
                                onChange={(e) => this.handleCheck(e, "leaveType")}
                              // checked={leaveType === "halfDay"}
                              />
                              <label htmlFor="halfDay" className="p-ml-2">
                                Half Day
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-w-100 p-mt-2">
                      {/* <span className="p-float-label">
                    <InputText id="emailAddress" className='p-w-100'  type="text" value={this.state.userName} onChange={(e) => this.handleCheck(e, "userName")} />
                    <label htmlFor="emailAddress">Email Address</label>
                  </span> */}

                      <span className="custom-inputs p-mb-2">
                        <i
                          className="pi pi-user"
                          style={{ fontSize: "1em", marginRight: "0.5em" }}
                        />
                        <label htmlFor="emailAddress">User Id</label>
                        <InputText
                          id="emailAddress"
                          placeholder="Enter Mobile No."
                          className={
                            this.state.userNameErr
                              ? "p-w-100 p-invalid block"
                              : "p-w-100"
                          }
                          type="text"
                          value={this.state.userName}
                          onChange={(e) => this.handleCheck(e, "userName")}
                        />
                      </span>
                      <span className="error-msg">
                        {this.state.userNameErr
                          ? CommonConfig.showErrorMsg(this.state.UserhelperText)
                          : null}
                      </span>
                    </div>

                    <div className="p-w-100 p-mt-4">
                      {/* <span className="p-float-label">
                    <InputText id="password" className='p-w-100' value={this.state.password} type="password"  onChange={(e) => this.handleCheck(e, "Password")} />
                    <label htmlFor="password">Password</label> 
                  </span> */}
                      <span className="password-field custom-inputs p-input-icon-right">
                        <label htmlFor="password">Password</label>
                        <InputText
                          id="password"
                          placeholder="Atleast 8-12 characters"
                          className={
                            this.state.passwordErr
                              ? "p-w-100 p-invalid block"
                              : "p-w-100"
                          }
                          value={this.state.password}
                          type={this.state.showPassword ? "text" : "password"}
                          onChange={(e) => this.handleCheck(e, "Password")}
                        />
                        <i
                          className={
                            this.state.showPassword
                              ? "icon-view tailer-icon"
                              : "icon-view-off tailer-icon"
                          }
                          onClick={() =>
                            this.togglePasswordVisibility("Password")
                          }
                        ></i>
                      </span>
                      <span className="error-msg">
                        {this.state.passwordErr
                          ? CommonConfig.showErrorMsg(
                            this.state.passwordhelperText
                          )
                          : null}
                      </span>
                    </div>

                    <div className="">
                      <p>
                        <a
                          href="#"
                          onClick={() => {
                            this.setState({ changePasswordModal: true });
                          }}
                        >
                          Forgot password
                        </a>
                      </p>
                    </div>

                    {/* <div className='p-col-8 p-mt-4 p-p-0 p-text-left'>
                  <div className="field-checkbox">
                    <Checkbox inputId="binary" checked={this.state.checked} onChange={e => this.setState({ checked: e.checked })} />
                    <label htmlFor="binary">{this.state.checked ? 'See you in 30 days' : 'Remember me for 30 days'}</label>
                  </div>
                </div> */}

                    <div className="p-w-100">
                      <Button
                        type="submit"
                        className="login-btn"
                        label="Login"
                      />
                      {/* <div className='text-link p-text-center' onClick={() => this.props.history.push('/forgot-password')} >
                        <span>Forgot password ?</span>
                        <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.00139523 4.45023C0.00139523 4.74857 0.245013 4.99098 0.54485 4.99098L12.8944 4.95369L9.48374 8.04902C9.25886 8.25414 9.24012 8.58978 9.44626 8.81353C9.5587 8.92541 9.70862 9 9.8398 9C9.97098 9 10.1022 8.94406 10.2146 8.85083L14.6185 4.84181C14.7309 4.74858 14.7871 4.5994 14.7871 4.45023C14.7871 4.30106 14.7122 4.15188 14.5997 4.05865L10.1959 0.142864C9.97098 -0.0622488 9.63366 -0.0436024 9.42752 0.180157C9.22138 0.403916 9.24012 0.739555 9.465 0.944668L12.8007 3.87218L0.563589 3.90948C0.245012 3.90948 0.00139523 4.15188 0.00139523 4.45023Z" fill="#1A5BE1" />
                        </svg>
                      </div> */}
                    </div>
                    <div>
                      <p>
                        Are you not registared ? So{" "}
                        <a href="/register">Register now</a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Sidebar
          visible={changePasswordModal}
          onHide={() => {
            this.setState({ changePasswordModal: false });
          }}
          position="right"
        // style={{ width: "32%" }}
        >
          <div>
            <div className="card-body">
              <h3>Forgot password</h3>
              <div className="form-area">
                <div className={"p-grid"}>
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
                        type="number"
                        value={this.state.mobileNumber}
                        onChange={(e) => this.handleCheck(e, "mobileNumber")}
                        maxLength={10}
                        keyfilter={"num"}
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

                  <div className="p-w-100 p-mt-0">
                    <span className="password-field custom-inputs p-input-icon-right">
                      <label
                        htmlFor="oldPassword"
                        style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                      >
                        Old Password<span style={{ color: "red" }}>*</span>
                      </label>
                      <InputText
                        id="oldpassword"
                        placeholder="Old password"
                        className={
                          this.state.passwordErr
                            ? "p-w-100 p-invalid block"
                            : "p-w-100"
                        }
                        type={this.state.showOldPassword ? "text" : "password"}
                        value={oldPassword}
                        onChange={(e) => this.handleCheck(e, "oldPassword")}
                      />
                      <i
                        className={
                          this.state.showPassword
                            ? "icon-view tailer-icon"
                            : "icon-view-off tailer-icon"
                        }
                        onClick={() =>
                          this.togglePasswordVisibility("oldPassword")
                        }
                      ></i>
                    </span>
                    <span className="error-msg" style={{ color: "red" }}>
                      {oldPasswordErr ? oldPasswordErrText : null}
                    </span>
                  </div>
                  <div className="p-w-100 p-mt-4">
                    <span className="password-field custom-inputs p-input-icon-right">
                      <label
                        htmlFor="newPassword"
                        style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                      >
                        New Password<span style={{ color: "red" }}>*</span>
                      </label>
                      <InputText
                        id="newPassword"
                        placeholder="New password"
                        className={
                          this.state.passwordErr
                            ? "p-w-100 p-invalid block"
                            : "p-w-100"
                        }
                        type={this.state.showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => this.handleCheck(e, "newPassword")}
                      />
                      <i
                        className={
                          this.state.showPassword
                            ? "icon-view tailer-icon"
                            : "icon-view-off tailer-icon"
                        }
                        onClick={() =>
                          this.togglePasswordVisibility("newPassword")
                        }
                      ></i>
                    </span>
                    <span className="error-msg" style={{ color: "red" }}>
                      {newPasswordErr ? newPasswordErrText : null}
                    </span>
                  </div>

                  <div className="p-w-100 p-mt-4">
                    <span className="password-field custom-inputs p-input-icon-right">
                      <label
                        htmlFor="confirmPassword"
                        style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                      >
                        Confirm Password<span style={{ color: "red" }}>*</span>
                      </label>
                      <InputText
                        id="confirmPassword"
                        placeholder="Re-type New Password"
                        className={
                          this.state.passwordErr
                            ? "p-w-100 p-invalid block"
                            : "p-w-100"
                        }
                        type={
                          this.state.showConfirmPassword ? "text" : "password"
                        }
                        value={confirmPassword}
                        onChange={(e) => this.handleCheck(e, "confirmPassword")}
                      />
                      <i
                        className={
                          this.state.showPassword
                            ? "icon-view tailer-icon"
                            : "icon-view-off tailer-icon"
                        }
                        onClick={() =>
                          this.togglePasswordVisibility("confirmPassword")
                        }
                      ></i>
                    </span>
                    <span className="error-msg" style={{ color: "red" }}>
                      {confirmPasswordErr ? confirmPasswordErrText : null}
                    </span>
                  </div>
                </div>
                <br />
                <div className="dialog-footer">
                  <Button
                    className="btn-dialog-submit p-mr-2"
                    severity="secondary"
                    raised
                    onClick={(e) => this.changePassword(e)}
                    style={{ height: "35px" }}
                  >
                    Submit
                  </Button>
                  <Button
                    className="btn-dialog-cancel"
                    onClick={() => {
                      this.setState({ changePasswordModal: false });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Sidebar>
      </div>
    );
  }
}
