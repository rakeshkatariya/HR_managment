/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import CommonConfig from "../../utils/constant";
import Toast from "../Shared/Toast/Toast";
import { OverlayPanel } from "primereact/overlaypanel";
import userImage from "../../assets/images/UserImage.png";
import { default as routes } from "../../routes";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import api from "../../utils/apiClient";
import APIConstant from "../../utils/PathConstants";
import { apiBase } from "../../utils/config";
import Loader from "../Shared/Loader/Loader";
import { Dropdown } from "primereact/dropdown";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

const initialState = {
  mainTitle: "",
  breadCrumb: "",
  Name: "",
  Email: "",
  UserType: "",
  LastLogin: "",
  changePasswordModal: false,
  leaveConfirmationModal: false,
  selectProject: false,

  oldPassword: "",
  oldPasswordErr: "",
  oldPasswordErrText: "",

  newPassword: "",
  newPasswordErr: "",
  newPasswordErrText: "",
  confirmPassword: "",
  confirmPasswordErr: "",
  confirmPasswordErrText: "",
  profilePath: "",
  loaded: false,
  leaveRequestList: [],
  employeeLeaveData: "",
};

const SERVER_PATH = apiBase;

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  backToLogin = () => {
    this.props.history.push("/login");
    Toast.success({ message: "Logged out success" });
  };

  handleLogout = (e) => {
    // e.preventDefault();
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          localStorage.clear();
          this.backToLogin();
          console.log("Signed out successfully");
        })
        .catch((error) => {
          // An error happened.
        });
    } catch (error) {
      console.log("Logout Err", error);
    }
    // this.props.history.push('/login');
  };

  manageSidebarWidth = () => {
    document.getElementById("sidebar-area").classList.toggle("sidebar-mini");
    document
      .getElementById("dashboard-area")
      .classList.toggle("large-dashboard-area");
  };

  componentDidMount = () => {
    this.getUserProfileByID();
    this.getLeaveRequestList();
    this.setState({
      Email: CommonConfig.loginData().EmailId,
      Name: CommonConfig.loginData().FullName,
      UserType: CommonConfig.loginData().UserType,
      LastLogin: CommonConfig.loginData().LastLogin,
    });
    let userModuleAccess =
      CommonConfig.getUserAccess() && CommonConfig.getUserAccess().length
        ? CommonConfig.getUserAccess()
        : [];
    if (userModuleAccess.length) {
      let routeDetails = userModuleAccess?.filter(
        (x) =>
          x.Path === this.props.location?.pathname ||
          (x.SubMenus?.filter((child) =>
            child.Path.includes(this.props.location.pathname)
          ).length &&
            x.SubMenus?.filter((child) =>
              child.Path.includes(this.props.location.pathname)
            )[0].Path === this.props.location.pathname)
      )[0];
      if (routeDetails) {
        if (routeDetails.Path) {
          this.setState({
            breadCrumb: routeDetails.MenuName,
            mainTitle: routeDetails.MenuName,
          });
        } else if (routeDetails.SubMenus.length) {
          let childRouteDetails =
            routeDetails.SubMenus.filter((child) =>
              child.Path.includes(this.props.location.pathname)
            ).length &&
            routeDetails.SubMenus.filter(
              (child) => child.Path === this.props.location.pathname
            )[0];
          this.setState({
            breadCrumb:
              routeDetails.MenuName + " / " + childRouteDetails.MenuName,
            mainTitle: childRouteDetails.MenuName,
          });
        }
      } else {
        if (
          routes.length &&
          routes.filter((x) => x.path === this.props.location.pathname).length
        ) {
          let breadCrumbDetails =
            // (routes.filter(x=>x.path == this.props.location.pathname)[0].parentName ? routes.filter(x=>x.path == this.props.location.pathname)[0].parentName+ " / " : '') +
            routes.filter((x) => x.path === this.props.location.pathname)[0]
              .breadCrumb;
          let mainTitleDetails = routes.filter(
            (x) => x.path === this.props.location.pathname
          )[0].meta.title;
          this.setState({
            breadCrumb: breadCrumbDetails,
            mainTitle: mainTitleDetails,
          });
        }
      }
    }
    // this.setState({ sidebarMenus: userModuleAccess })
  };

  getUserProfileByID = async () => {
    let data = {
      UserID: CommonConfig.loginData().UserId,
    };
    try {
      api
        .post(APIConstant.path.getUserProfileByID, data)
        .then(async (res) => {
          let response = await res;
          if (response.success) {
            // console.log('calling', response.data[0].PicturePath)
            let filePath = `${SERVER_PATH}/${response.data.recordset[0].ProfilePhoto}`;
            localStorage.setItem("ProfilePath", filePath);
            this.setState({
              profilePath: `${SERVER_PATH}/${response.data.recordset[0].ProfilePhoto}`,
            });
          } else {
          }
        })
        .catch((err) => {});
    } catch (err) {}
  };

  getLeaveRequestList = async (ID) => {
    try {
      let data = {
        UserType:CommonConfig.loginData().UserType,
      };
      await api
        .post(APIConstant.path.getLeaveRequestList, data)
        .then(async (res) => {
          if (res.success) {
            this.setState({
              leaveRequestList: res.data.recordset,
            });
            Loader.hide();
          }
        })
        .catch((err) => {
          Loader.hide();
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  approvalLeaveRequest = async (e, status) => {
    e.preventDefault();
    Loader.show();
    let data = {
      UserId: CommonConfig.loginData().UserId,
      LeaveId: this.state.employeeLeaveData.LeaveId,
      LeaveStatus: status,
    };
    try {
      api
        .post(APIConstant.path.LeaveApprovalByAdmin, data)
        .then((res) => {
          if (res.success) {
            Toast.success({ message: res.message });
            Loader.hide();
            this.getLeaveRequestList();
            this.setState(initialState);
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
  };

  handleOpen = async (item, type) => {
    if (type === "LeaveNotification") {
      this.setState({ leaveConfirmationModal: true, employeeLeaveData: item });
    }
    console.log("data", item);
  };

  handleCheck = (e, type) => {
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
    let isValid = true;
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
    if (this.validate()) {
      try {
        let data = {
          // UserID: CommonConfig.loginData().SecurityUserID,
          MobileNumber: CommonConfig.loginData().MobileNumber,
          OldPassword: this.state.oldPassword,
          NewPassword: this.state.newPassword,
        };
        api.post(APIConstant.path.ForgotPassword, data).then((response) => {
          if (response.success) {
            Loader.hide();
            this.props.history.push("/dashboard");
            this.setState(initialState);
            Toast.success({ message: response.message });
          } else {
            Toast.error({ message: response.message });
            Loader.hide();
          }
        });
      } catch (err) {}
    }
  };

  onError = () => {
    this.setState({
      profilePath: undefined,
    });
  };

  render() {
    const {
      Name,
      Email,
      LastLogin,
      UserType,
      changePasswordModal,
      leaveConfirmationModal,
      selectProject,
      oldPassword,
      newPassword,
      oldPasswordErr,
      oldPasswordErrText,
      newPasswordErr,
      newPasswordErrText,
      confirmPassword,
      confirmPasswordErr,
      confirmPasswordErrText,
      profilePath,
      leaveRequestList,
      employeeLeaveData,
    } = this.state;
    return (
      <div>
        <div className="dashboard-header">
          <div className="p-d-flex p-jc-between p-ai-center">
            <div className="p-d-md-none"></div>
            <div
              onClick={() => this.manageSidebarWidth()}
              className="sidebar-handler cursor-pointer"
            >
              <i className="icon-sidebar-menu"></i>
            </div>
            <div className="card-title p-pl-3 p-d-none p-d-md-block">
              <label className="header-title">{this.state.mainTitle}</label>
              <label className="path-name">{this.state.breadCrumb}</label>
            </div>

            <div className="header-right-action">
              <button className="btn-icon-none">
                <i className="icon-dark-theme"></i>
              </button>
              <button
                className="btn-icon-none p-ml-2"
                onClick={(e) => this.notificationPanel.toggle(e)}
              >
                <i className="icon-notification"></i>
                <label className="icon-dot">{leaveRequestList.length}</label>
              </button>

              <OverlayPanel
                ref={(el) => (this.notificationPanel = el)}
                id="notification_panel"
                style={{ width: "400px" }}
                className="profile-menu"
                showCloseIcon={true}
              >
                <div className="">
                  {((leaveRequestList && leaveRequestList.length > 0) ||
                    UserType === "Admin") ? (
                    <div>
                      {/* <h3>Leave Notifications</h3> */}
                      {leaveRequestList.map((leave, index) => (
                        <ul className="menu-options" key={index}>
                          <li
                            className="menu-link"
                            onClick={() =>
                              this.handleOpen(leave, "LeaveNotification")
                            }
                          >
                            <i className="icon-edit-profile p-mr-2"></i>
                            <span>
                              {leave.EmployeeName}
                              {"  "}
                              applied for the leave
                            </span>
                            <label className="list-dot"></label>
                          </li>
                        </ul>
                      ))}
                    </div>
                  ):(
                    <p>no any notification</p>
                  )}
                </div>
              </OverlayPanel>

              <OverlayPanel
                ref={(el) => (this.op = el)}
                id="overlay_panel"
                style={{ width: "450px" }}
                className="profile-menu"
              >
                <div className="profile-menu-container">
                  <div className="p-d-flex p-ai-center">
                    <div className="profile-img-popup">
                      <img
                        src={
                          CommonConfig.isEmpty(profilePath)
                            ? userImage
                            : profilePath
                        }
                        width="150px"
                        alt="userImage"
                        onError={this.onError}
                      />

                      {/* <img src={profilePath} width="150px" /> */}
                    </div>
                    <div className="p-ml-2">
                      <label className="user-name">{Name}</label> <br />
                      <span className="email-address">{Email}</span>
                      <br />
                      <div className="userType">{UserType}</div>
                    </div>
                  </div>
                  <hr />
                  <ul className="menu-options">
                    <li
                      className="menu-link"
                      onClick={() =>
                        this.props.history.push({ pathname: "/edit-profile" })
                      }
                    >
                      <i className="icon-edit-profile"></i>
                      <span>Edit Profile</span>
                      <label className="list-dot"></label>
                    </li>
                    <li
                      className="menu-link"
                      onClick={() => {
                        this.setState({ changePasswordModal: true });
                      }}
                    >
                      <i className="icon-change-password"></i>
                      <span>Change Password</span>
                      <label className="list-dot"></label>
                    </li>
                    <li
                      onClick={(e) => this.handleLogout(e)}
                      className="menu-link"
                    >
                      <i className="icon-logout"></i>
                      <span>Logout</span>
                      <label className="list-dot"></label>
                    </li>
                  </ul>
                  <hr />
                  <span className="last-login-info">
                    Last login:{LastLogin}{" "}
                  </span>
                </div>
              </OverlayPanel>
              <div className="profile-section">
                <div
                  className="p-d-flex p-ai-center cursor-pointer"
                  onClick={(e) => this.op.toggle(e)}
                >
                  <div className="profile-img">
                    <img
                      src={
                        CommonConfig.isEmpty(profilePath)
                          ? userImage
                          : profilePath
                      }
                      width="150px"
                      alt="userImage"
                      onError={this.onError}
                    />

                    {/* <img src={profilePath == "" || profilePath == null || profilePath == undefined ? userImage : profilePath} width="150px" alt='Image' /> */}
                    <label className="userActive"></label>
                  </div>
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
            style={{ width: "32%" }}
          >
            <div>
              <div className="card-body">
                <h3>Forgot password</h3>
                <div className="form-area">
                  <div className={"p-grid"}>
                    <div className="p-col-12 p-md-4 p-pt-2">
                      <div className="p-w-100 ">
                        <div className="custom-inputs">
                          <label htmlFor="oldPassword">
                            Old Password <span style={{ color: "red" }}>*</span>
                            :{" "}
                          </label>
                          <InputText
                            className="p-w-100 p-mt-2"
                            id="oldPassword"
                            type="text"
                            placeholder="Name"
                            value={oldPassword}
                            autoFocus={true}
                            onChange={(e) => this.handleCheck(e, "oldPassword")}
                            maxLength={30}
                          />
                        </div>
                        <span className="error-msg" style={{ color: "red" }}>
                          {oldPasswordErr ? oldPasswordErrText : null}
                        </span>
                      </div>
                    </div>
                    <div className="p-col-12 p-md-4 p-pt-2">
                      <div className="p-w-100 ">
                        <div className="custom-inputs">
                          <label htmlFor="newPassword">
                            New Password <span style={{ color: "red" }}>*</span>
                            :{" "}
                          </label>
                          <InputText
                            className="p-w-100 p-mt-2"
                            id="newPassword"
                            type="text"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => this.handleCheck(e, "newPassword")}
                          />
                        </div>
                        <span className="error-msg" style={{ color: "red" }}>
                          {newPasswordErr ? newPasswordErrText : null}
                        </span>
                      </div>
                    </div>

                    <div className="p-col-12 p-md-4 p-pt-2">
                      <div className="p-w-100 ">
                        <div className="custom-inputs">
                          <label htmlFor="confirmPassword">
                            Confirm Password{" "}
                            <span style={{ color: "red" }}>*</span>:{" "}
                          </label>
                          <InputText
                            className="p-w-100 p-mt-2"
                            id="confirmPassword"
                            type="text"
                            placeholder="Re-type New Password"
                            value={confirmPassword}
                            onChange={(e) =>
                              this.handleCheck(e, "confirmPassword")
                            }
                          />
                        </div>
                        <span className="error-msg" style={{ color: "red" }}>
                          {confirmPasswordErr ? confirmPasswordErrText : null}
                        </span>
                      </div>
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

        {/* Leave conformation sidebar */}
        <Sidebar
          visible={leaveConfirmationModal}
          onHide={() => {
            this.setState({ leaveConfirmationModal: false });
          }}
          position="right"
          showCloseIcon={false}
          style={{ position: "relative" }}
        >
          <div className="card-body">
            <div className="form-area">
              <h3>Leave Confirmation</h3>
              <div className="p-col-12 p-md-12 p-pl-0 p-pt-0">
                <div className={"p-grid"}>
                  <div className="p-md-12 p-pt-0">
                    <div className="p-w-100 ">
                      <p>
                        <b>Name: </b>{" "}
                        {!CommonConfig.isObjectEmpty(employeeLeaveData) &&
                        !CommonConfig.isEmpty(employeeLeaveData?.EmployeeName)
                          ? employeeLeaveData?.EmployeeName
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <div className="p-col-12 p-md-12 p-pt-0">
                    <div className="p-w-100 ">
                      <p>
                        <b>From Date:</b>{" "}
                        {!CommonConfig.isObjectEmpty(employeeLeaveData) &&
                        !CommonConfig.isEmpty(employeeLeaveData?.FromDate)
                          ? employeeLeaveData?.FromDate
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <div className="p-col-12 p-md-12 p-pt-0">
                    <div className="p-w-100 ">
                      <p>
                        <b>To Date : </b>{" "}
                        {!CommonConfig.isObjectEmpty(employeeLeaveData) &&
                        !CommonConfig.isEmpty(employeeLeaveData?.ToDate)
                          ? employeeLeaveData?.ToDate
                          : "-"}
                      </p>
                    </div>
                  </div>

                  <div className="p-col-12 p-md-12 p-pt-0">
                    <div className="">
                      <p>
                        <b>Leeave Mode : </b>{" "}
                        {!CommonConfig.isObjectEmpty(employeeLeaveData) &&
                        !CommonConfig.isEmpty(employeeLeaveData?.LeaveType)
                          ? employeeLeaveData?.LeaveType === "1"
                            ? "Full Day"
                            : "Half Day"
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <div className="p-col-12 p-md-12 p-pt-0">
                    <div className="p-w-100 ">
                      <p>
                        <b>Reason : </b>{" "}
                        {!CommonConfig.isObjectEmpty(employeeLeaveData) &&
                        !CommonConfig.isEmpty(employeeLeaveData?.Reason)
                          ? employeeLeaveData?.Reason
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="dialog-footer">
                <Button
                  className="btn-dialog-submit p-mr-2"
                  severity="secondary"
                  raised
                  onClick={(e) => this.approvalLeaveRequest(e, "Approved")}
                  style={{ height: "35px" }}
                >
                  Approv
                </Button>
                <Button
                  className="btn-dialog-submit p-mr-2"
                  severity="secondary"
                  raised
                  onClick={(e) => this.approvalLeaveRequest(e, "Rejected")}
                  style={{ height: "35px" }}
                >
                  Reject
                </Button>
                <Button
                  className="btn-dialog-cancel "
                  onClick={(e) => {
                    this.setState({ leaveConfirmationModal: false });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Sidebar>
      </div>
    );
  }
}
