/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import api from "../../utils/apiClient";
import CommonConfig from "../../utils/constant";
import APIConstant from "../../utils/PathConstants";
import Toast from "../Shared/Toast/Toast";
import Loader from "../Shared/Loader/Loader";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useHistory } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { Sidebar } from "primereact/sidebar";

// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.css';

const Leave = () => {
  const [leaveId, setLeaveId] = useState(null);
  const [securityUserID, setSecurityUserID] = useState(null);

  const [employeeName, setEmployeeName] = useState("");
  const [employeeNameErr, setEmployeeNameErr] = useState(false);
  const [employeeNameErrText, setEmployeeNameErrText] = useState("");
  const [userList, setUserList] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [fromDateErr, setFromDateErr] = useState(false);
  const [fromDateErrText, setFromDateErrText] = useState("");

  const [toDate, setToDate] = useState("");
  const [toDateErr, setToDateErr] = useState(false);
  const [toDateErrText, setToDateErrText] = useState("");

  const [reason, setReason] = useState("");
  const [reasonErr, setReasonErr] = useState(false);
  const [reasonErrText, setReasonErrText] = useState("");

  const [leaveType, setLeaveType] = useState("fullDay");

  const [globalFilter, setGlobalFilter] = useState("");
  const [filteredLeaveList, setFilteredLeaveList] = useState([]);
  const [leaveList, setLeaveList] = useState([]);
  const [showLeaveList, setShowLeaveList] = useState(true);
  const [leaveModal, setLeaveModal] = useState(false);
  const [isDeleteLeaveModal, setIsDeleteLeaveModal] = useState(false);
  const [isApprovedLeaveModal, setIsApprovedLeaveModal] = useState(false);

  useEffect(() => {
    const loginData = CommonConfig.loginData();
    setSecurityUserID(loginData?.SecurityUserID);
    setEmployeeName(loginData?.SecurityUserID);
    getUserList();
    getLeaveList();
  }, []);

  useEffect(() => {
    const filteredList = leaveList.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(globalFilter.toLowerCase())
      )
    );
    setFilteredLeaveList(filteredList);
  }, [globalFilter, leaveList]);

  const getUserList = async () => {
    try {
      // Loader.show();
      let data = {};
      api
        .post(APIConstant.path.GetUserList, data)
        .then((res) => {
          if (res.success) {
            Loader.hide();
            setUserList(res.data.recordset);
          } else {
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

  const resetScreen = async () => {
    // setSecurityUserID(null);
    setLeaveId(null);
    setLeaveModal(false);

    setEmployeeName("");
    setEmployeeNameErr(false);
    setEmployeeNameErrText("");

    setFromDate("");
    setFromDateErr(false);
    setFromDateErrText("");

    setToDate("");
    setToDateErr(false);
    setToDateErrText("");

    setReason("");
    setReasonErr(false);
    setReasonErrText("");
  };

  const handleChange = (e, type) => {
    if (type === "employeeName") {
      if (CommonConfig.isEmpty(e.value)) {
        setEmployeeName("");
        setEmployeeNameErr(true);
        setEmployeeNameErrText("Please enter name");
      } else {
        setEmployeeName(e.value);
        setEmployeeNameErr(false);
        setEmployeeNameErrText("");
      }
    }
    if (type === "fromDate") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setFromDate("");
        setFromDateErr(true);
        setFromDateErrText("Please enter From date");
      } else {
        let selectedDate = new Date(e.target.value);
        let adjustedDate = new Date(
          Date.UTC(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
          )
        );
        setFromDate(adjustedDate);
        if (leaveType === "halfDay") {
          setToDate(adjustedDate);
        }
        // setFromDate(e.target.value);
        setFromDateErr(false);
        setFromDateErrText("");
      }
    }
    if (type === "toDate") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setToDate("");
        setToDateErr(true);
        setToDateErrText("Please enter to date");
      } else {
        let selectedDate = new Date(e.target.value);
        let adjustedDate = new Date(
          Date.UTC(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
          )
        );
        setToDate(adjustedDate);
        setToDateErr(false);
        setToDateErrText("");
      }
    }
    if (type === "reason") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setReason("");
        setReasonErr(true);
        setReasonErrText("Please enter reason");
      } else {
        setReason(e.target.value);
        setReasonErr(false);
        setReasonErrText("");
      }
    }
    if (type === "leaveType") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setLeaveType("");
      } else {
        setLeaveType(e.target.value);
        if (e.target.value === "halfDay") {
          setToDate(fromDate);
        }
      }
    }
  };

  const handleOpen = async (item, type) => {
    if (type === "AddLeave") {
      setLeaveModal(true);
    } else if (type === "EditLeave") {
      setLeaveModal(true);
      setLeaveId(item.LeaveMasterID);
      setEmployeeName(parseInt(item?.EmployeeId));
      const fromDateParts = item.FromDate.split("-");
      setFromDate(
        new Date(`${fromDateParts[2]}-${fromDateParts[1]}-${fromDateParts[0]}`)
      );
      const toDateParts = item.ToDate.split("-");
      setToDate(
        new Date(`${toDateParts[2]}-${toDateParts[1]}-${toDateParts[0]}`)
      );
      if (item.LeaveType === "1") {
        setLeaveType("fullDay");
      } else if (item.LeaveType === "0.5") {
        setLeaveType("halfDay");
      }
      setReason(item.Description);
    } else if (type === "DeleteLeave") {
      setLeaveId(item.LeaveMasterID);
      setIsDeleteLeaveModal(true);
    } else if (type === "ApprovedLeave") {
      setLeaveId(item.LeaveMasterID);
      setIsApprovedLeaveModal(true);
    }
  };

  const handleClose = async (type) => {
    if (type === "AddLeave") {
      setLeaveModal(false);
      resetScreen();
    } else if (type === "EditLeave") {
      setLeaveModal(false);
      resetScreen();
    } else if (type === "DeleteLeave") {
      setLeaveId(null);
      resetScreen();
      setIsDeleteLeaveModal(false);
    } else if (type === "ApprovedLeave") {
      setLeaveId("");
      setIsApprovedLeaveModal(false);
    }
  };

  const actionBodyTemplateSrNo = (data, props) => {
    return props.rowIndex + 1;
  };

  const validation = () => {
    let IsformValid = true;

    // if (CommonConfig.isEmpty(employeeName)) {
    //   setEmployeeNameErr(true);
    //   setEmployeeNameErrText("Name is required");
    //   IsformValid = false;
    // } else {
    //   setEmployeeNameErr(false);
    //   setEmployeeNameErrText("");
    // }
    if (CommonConfig.isEmpty(fromDate)) {
      setFromDateErr(true);
      setFromDateErrText("From date is required");
      IsformValid = false;
    } else {
      setFromDateErr(false);
      setFromDateErrText("");
    }
    if (CommonConfig.isEmpty(fromDate)) {
      setToDateErr(true);
      setToDateErrText("To date is required");
      IsformValid = false;
    } else {
      setToDateErr(false);
      setToDateErrText("");
    }
    if (CommonConfig.isEmpty(reason)) {
      setReasonErr(true);
      setReasonErrText("Reason is required");
      IsformValid = false;
    } else {
      setReasonErr(false);
      setReasonErrText("");
    }
    return IsformValid;
  };

  const ApprovedLeave = async (e) => {
    e.preventDefault();
    Loader.show();
    let data = {
      // SecurityUserID: securityUserID,
      EmployeeId: securityUserID,
    };
    try {
      api
        .post(APIConstant.path.AddUpdatePolicy, data)
        .then((res) => {
          const response = res.data;
          if (response.success) {
            Toast.success({ message: response.message });
            Loader.hide();
            resetScreen();
          } else {
            Toast.error({ message: response.message });
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

  const AddUpdateLeave = async (e) => {
    e.preventDefault();
    if (validation()) {
      Loader.show();
      let data = {
        SecurityUserID: securityUserID,
        LeaveId: leaveId,
        EmployeeId: employeeName,
        LeaveType: leaveType === "fullDay" ? 1 : 0.5,
        FromDate: fromDate,
        ToDate: toDate,
        Reason: reason,
      };
      try {
        api
          .post(APIConstant.path.AddUpdateLeave, data)
          .then((res) => {
            if (res.success) {
              Toast.success({ message: res.message });
              Loader.hide();
              getLeaveList();
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

  const DeleteLeave = async () => {
    try {
      Loader.show();
      let data = {
        LeaveId: leaveId,
        UserId: securityUserID,
      };
      await api
        .post(APIConstant.path.DeleteLeave, data)
        .then(async (res) => {
          if (res.success) {
            handleClose("DeleteLeave");
            Loader.hide();
            Toast.success({ message: res.message });
            getLeaveList();
            resetScreen();
          } else {
            Loader.hide();
            Toast.error({ message: res.message });
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
  };

  const getLeaveList = async (ID) => {
    try {
      let data = {};
      await api
        .post(APIConstant.path.getLeaveDataList, data)
        .then(async (res) => {
          if (res.success) {
            setLeaveList(res.data[0]);
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

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="table-icon">
        <Button
          className=""
          onClick={() => handleOpen(rowData, "EditLeave")}
          tooltip={"Edit"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-edit"></i>
        </Button>
        <Button
          className=""
          onClick={() => handleOpen(rowData, "DeleteLeave")}
          tooltip={"Delete"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-delete"></i>
        </Button>
        {/* <Button
          className=""
          onClick={() => handleOpen(rowData, "ViewLeave")}
          tooltip={"view"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-view"></i>
        </Button> */}
      </div>
    );
  };

  const calculateTotalLeave = (rowData) => {
    const fromDateParts = rowData.FromDate.split("-");
    const toDateParts = rowData.ToDate.split("-");
    const fromDate = new Date(
      fromDateParts[2],
      fromDateParts[1] - 1,
      fromDateParts[0]
    );
    const toDate = new Date(toDateParts[2], toDateParts[1] - 1, toDateParts[0]);
    const differenceMs = toDate - fromDate + 1;
    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    if (rowData.LeaveType === "0.5") {
      return "0.5 days";
    } else {
      return differenceDays + " days";
    }
  };

  const leaveModeBody = (rowData) => {
    if (rowData.LeaveType === "0.5") {
      return <span>Half-day</span>;
    } else if (rowData.LeaveType === "1") {
      return <span>Full-day</span>;
    }
  };

  const toggleLeaveList = () => {
    setShowLeaveList(!showLeaveList);
  };

  return (
    <div className="user-container">
      <div className="card-header">
        <div className="card-title p-d-lg-flex p-ai-center p-w-100">
          <h3 className="p-mb-3 p-mb-lg-0 p-ai-center">View Leave</h3>
          <div className="p-ml-auto p-d-lg-flex p-ai-center">
            <span className="searchbar-area">
              <InputText
                type="search"
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Global Search"
                size="30"
              />
              <i className="icon-search"></i>
            </span>
          </div>
          <div className="card-actions p-ml-2">
            <Button
              type="button"
              className="add-btn add-btn p-button p-component p-jc-center p-w-100 p-mr-2"
              onClick={(e) => handleOpen(e, "AddLeave")}
            >
              <i className="icon-add p-mr-2"></i>Add Leave
            </Button>
            <Button
              className="p-button p-component p-jc-center"
              onClick={toggleLeaveList}
            >
              {!showLeaveList ? (
                <i className="icon-dashboard"></i>
              ) : (
                <i className="pi pi-list"></i>
              )}
            </Button>
          </div>
        </div>
      </div>
      {!showLeaveList && (
        <div className="card">
          <DataTable
            globalFilter={globalFilter}
            paginator
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            className="custom-table"
            value={leaveList}
            scrollable
            scrollHeight="calc(100vh - 203px)"
          >
            <Column
              field="Index"
              header="Sr.No"
              body={actionBodyTemplateSrNo}
              style={{ maxWidth: 150 }}
            />
            <Column
              field="EmployeeName"
              header="Employee name"
              style={{ width: "25%" }}
            />
            <Column
              field="FromDate"
              header="From date"
              style={{ width: "25%" }}
            />
            <Column field="ToDate" header="To date" style={{ width: "25%" }} />
            <Column
              field="LeaveType"
              header="Leave mode"
              body={(rowData) => leaveModeBody(rowData)}
              style={{ width: "25%" }}
            />
            <Column
              field="TotalLeave"
              header="Total Leave"
              body={(rowData) => calculateTotalLeave(rowData)}
              style={{ width: "25%" }}
            />
            <Column
              field="LeaveStatus"
              header="Leave Status"
              style={{ width: "25%" }}
            />
            <Column header="Action" body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
      )}
      {showLeaveList && (
        <div className="card-body">
          <div className="dashboard-container p-grid">
            {filteredLeaveList.map((leaveItem, index) => (
              <div
                key={index}
                className="p-col-12 p-sm-12 p-md-3"
                style={{ marginTop: "-15px" }}
              >
                <div className="dashboard-box p-mb-2">
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        className="title"
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                      >
                        Name: {leaveItem.EmployeeName}
                      </div>
                      <div className="p-col-3 p-mt-0">
                        <div
                          className="table-icon"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: "-4px",
                          }}
                        >
                          <div
                            className=""
                            onClick={() => handleOpen(leaveItem, "EditLeave")}
                            tooltip={"Edit"}
                            tooltipOptions={{
                              className: "bluegray-tooltip",
                              position: "top",
                            }}
                          >
                            <i className="icon-edit"></i>
                          </div>
                          <span
                            className=""
                            onClick={() => handleOpen(leaveItem, "DeleteLeave")}
                            tooltip={"Delete"}
                            tooltipOptions={{
                              className: "bluegray-tooltip",
                              position: "top",
                            }}
                          >
                            <i className="icon-delete"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="">Date: {leaveItem.FromDate}</span>
                      <span className=""> To {leaveItem.ToDate}</span>
                    </div>
                    <div
                      className=""
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="">Type: {leaveModeBody(leaveItem)}</div>
                      <div className="">
                        Total leave: {calculateTotalLeave(leaveItem)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Confirm Modal */}
      <Sidebar
        visible={leaveModal}
        onHide={() => setLeaveModal(true)}
        position="right"
        showCloseIcon={false}
        style={{ position: "relative" }}
      >
        <div>
          <div className="card-body">
            <div className="form-area">
              <h3>{leaveId ? "Edit Leave" : "Add Leave"}</h3>
              <div className={"p-grid"}>
                <div className="p-col-12 p-md-12 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label htmlFor="name">
                        Employee name <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <Dropdown
                        className="p-w-100 p-mt-2"
                        inputId="employeeName"
                        autoFocus={true}
                        // showClear
                        placeholder="Select employeeName"
                        value={employeeName}
                        onChange={(e) => handleChange(e, "employeeName")}
                        options={userList}
                        optionLabel="Name"
                        optionValue="Value"
                        filter
                      />
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {employeeNameErr ? employeeNameErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-12 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label htmlFor="leaveType">Leave Mode :</label>
                      {/* <div className="flex gap-3" style={{ display: "flex" }}> */}
                      <div className="flex align-items-center p-pt-2">
                        <RadioButton
                          inputId="fullDay"
                          name="leaveType"
                          value="fullDay"
                          onChange={(e) => handleChange(e, "leaveType")}
                          checked={leaveType === "fullDay"}
                          className="mr-10"
                        />
                        <label htmlFor="fullDay" className="p-ml-2">
                          full Day
                        </label>
                      </div>
                      <div className="p-pt-2">
                        <RadioButton
                          inputId="halfDay"
                          name="leaveType"
                          value="halfDay"
                          onChange={(e) => handleChange(e, "leaveType")}
                          checked={leaveType === "halfDay"}
                        />
                        <label htmlFor="halfDay" className="p-ml-2">
                          Half Day
                        </label>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
                <div className="p-col-12 p-md-12 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <span className="fromedate-field custom-inputs p-input-icon-right">
                        <label htmlFor="fromDate">
                          From Date <span style={{ color: "red" }}>*</span>:{" "}
                        </label>
                        <Calendar
                          className="p-w-100 p-mt-0"
                          id="fromDate"
                          type="date"
                          placeholder="dd/mm/yyyy"
                          value={fromDate}
                          onChange={(e) => handleChange(e, "fromDate")}
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
                      {fromDateErr ? fromDateErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-12 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <span className="toDate-field custom-inputs p-input-icon-right">
                        <label htmlFor="toDate">
                          To Date <span style={{ color: "red" }}>*</span>:{" "}
                        </label>
                        <Calendar
                          className="p-w-100 p-mt-0"
                          id="toDate"
                          type="date"
                          placeholder="dd/mm/yyyy"
                          value={toDate}
                          minDate={fromDate}
                          onChange={(e) => handleChange(e, "toDate")}
                          dateFormat="dd/mm/yy"
                          disabled={leaveType === "halfDay"}
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
                      {toDateErr ? toDateErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-12 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label htmlFor="reason">
                        Reason <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <InputText
                        className="p-w-100 p-mt-2"
                        id="reason"
                        type="text"
                        placeholder="Name"
                        value={reason}
                        onChange={(e) => handleChange(e, "reason")}
                      />
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {reasonErr ? reasonErrText : null}
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
                  onClick={(e) => AddUpdateLeave(e)}
                  style={{ height: "35px" }}
                >
                  Applay for leave
                </Button>
                <Button
                  className="btn-dialog-cancel "
                  onClick={(e) => handleClose("AddLeave")}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>

      {/* Delete Confirm Modal */}
      <Dialog
        header="Delete Leave"
        visible={isDeleteLeaveModal}
        className="dialog-popup"
        onHide={(e) => handleClose("DeleteLeave")}
        draggable={false}
        closable={false}
        position="top"
      >
        <span>Are you sure want to delete the leave ?</span>
        <div className="dialog-footer">
          <button
            className="btn-dialog-cancel"
            onClick={(e) => handleClose("DeleteLeave")}
          >
            Cancel
          </button>
          <button className="btn-dialog-delete" onClick={() => DeleteLeave()}>
            Delete
          </button>
        </div>
      </Dialog>

      {/* Approved Confirm Modal */}
      <Dialog
        header="Approved Leave"
        visible={isApprovedLeaveModal}
        className="dialog-popup"
        onHide={(e) => handleClose("ApprovedLeave")}
        draggable={false}
        closable={false}
        position="top"
      >
        <span>Are you sure want to approve the leave ?</span>
        <div className="dialog-footer">
          <button
            className="btn-dialog-cancel"
            onClick={(e) => handleClose("ApprovedLeave")}
          >
            Cancel
          </button>
          <button className="btn-dialog-delete" onClick={() => ApprovedLeave()}>
            Approved
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default Leave;
