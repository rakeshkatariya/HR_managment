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
import { Sidebar } from "primereact/sidebar";
import { Dropdown } from "primereact/dropdown";

// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.css';

const OverTime = () => {
  const [overTimeId, setOverTimeId] = useState(null);
  const [securityUserID, setSecurityUserID] = useState(null);

  const [employeeName, setEmployeeName] = useState("");
  const [employeeNameErr, setEmployeeNameErr] = useState(false);
  const [employeeNameErrText, setEmployeeNameErrText] = useState("");
  const [userList, setUserList] = useState([]);

  const [date, setDate] = useState("");
  const [dateErr, setDateErr] = useState(false);
  const [dateErrText, setDateErrText] = useState("");

  const [fromTime, setFromTime] = useState("");
  const [fromTimeErr, setFromTimeErr] = useState(false);
  const [fromTimeErrText, setFromTimeErrText] = useState("");
  const [fromTimeRaw, setFromTimeRaw] = useState("");

  const [toTime, setToTime] = useState("");
  const [toTimeErr, setToTimeErr] = useState(false);
  const [toTimeErrText, setToTimeErrText] = useState("");
  const [toTimeRaw, setToTimeRaw] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [descriptionErrText, setDescriptionErrText] = useState("");

  const [globalFilter, setGlobalFilter] = useState("");
  const [overTimeList, setOverTimeList] = useState([]);
  const [isAddOverTimeModal, setIsAddOverTimeModal] = useState(false);
  const [isDeleteOverTimeModal, setIsDeleteOverTimeModal] = useState(false);

  useEffect(() => {
    const loginData = CommonConfig.loginData();
    setSecurityUserID(loginData?.SecurityUserID);
    getUserList();
    getOverTimeList();
  }, []);

  const resetScreen = async () => {
    setOverTimeId(null);
    // setSecurityUserID(null);

    setEmployeeName("");
    setEmployeeNameErr(false);
    setEmployeeNameErrText("");

    setDate("");
    setDateErr(false);
    setDateErrText("");

    setFromTime("");
    setFromTimeErr(false);
    setFromTimeErrText("");
    setFromTimeRaw("");

    setToTime("");
    setToTimeErr(false);
    setToTimeErrText("");
    setToTimeRaw("");

    setDescription("");
    setDescriptionErr(false);
    setDescriptionErrText("");

    setGlobalFilter("");
    setIsAddOverTimeModal(false);
    setIsDeleteOverTimeModal(false);
  };

  const getUserList = async () => {
    try {
      // Loader.show();
      let data = {};
      api
        .post(APIConstant.path.GetUserList, data)
        .then((res) => {
          if (res.success) {
            Loader.hide();
            setUserList(res.data[0]);
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

  const handleChange = (e, type) => {
    if (type === "employeeName") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setEmployeeName("");
        setEmployeeNameErr(true);
        setEmployeeNameErrText("Please enter name");
      } else {
        setEmployeeName(e.target.value);
        setEmployeeNameErr(false);
        setEmployeeNameErrText("");
      }
    }
    if (type === "date") {
      if (CommonConfig.isEmpty(e.value)) {
        setDate("");
        setDateErr(true);
        setDateErrText("Please enter date");
      } else {
        const selectedDate = new Date(e.value);
        const adjustedDate = new Date(
          Date.UTC(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
          )
        );
        setDate(adjustedDate);
        setDateErr(false);
        setDateErrText("");
      }
    }
    if (type === "fromTime") {
      const formattedTime = new Date(e.target.value).toLocaleTimeString(
        "en-IN",
        { hour12: false }
      );
      if (CommonConfig.isEmpty(e.target.value)) {
        setFromTime("");
        setFromTimeErr(true);
        setFromTimeErrText("Please enter from time");
      } else {
        const timeParts = formattedTime.split(":");
        const HHMM = timeParts.slice(0, 2).join(":");
        setFromTime(HHMM);
        setFromTimeRaw(e.target.value);
        setFromTimeErr(false);
        setFromTimeErrText("");
      }
    }
    if (type === "toTime") {
      const formattedTime = new Date(e.target.value).toLocaleTimeString(
        "en-IN",
        { hour12: false }
      );
      if (CommonConfig.isEmpty(e.target.value)) {
        setToTime("");
        setToTimeErr(true);
        setToTimeErrText("Please enter totime");
      } else {
        const timeParts = formattedTime.split(":");
        const HHMM = timeParts.slice(0, 2).join(":");
        setToTime(HHMM);
        setToTimeRaw(e.target.value);
        setToTimeErr(false);
        setToTimeErrText("");
      }
    }
    if (type === "description") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setDescription("");
        setDescriptionErr(true);
        setDescriptionErrText("Please enter description");
      } else {
        setDescription(e.target.value);
        setDescriptionErr(false);
        setDescriptionErrText("");
      }
    }
  };

  const handleOpen = async (item, type) => {
    if (type === "AddOverTime") {
      setIsAddOverTimeModal(true);
    } else if (type === "EditOverTime") {
      setOverTimeId(item.OverTimeID);
      setEmployeeName(item.EmployeeId);
      // setDate(new Date(item.Date));
      const parts = item.Date.split("-");
      setDate(new Date(`${parts[2]}-${parts[1]}-${parts[0]}`));
      setToTime(item.ToTime);
      const [toHours, toMinutes] = item.ToTime.split(":");
      const toTimeDate = new Date();
      toTimeDate.setHours(parseInt(toHours));
      toTimeDate.setMinutes(parseInt(toMinutes));
      setToTimeRaw(toTimeDate);
      const [fromHours, fromMinutes] = item.FromTime.split(":");
      const FromTimeDate = new Date();
      FromTimeDate.setHours(parseInt(fromHours));
      FromTimeDate.setMinutes(parseInt(fromMinutes));
      setFromTime(item.FromTime);
      setFromTimeRaw(FromTimeDate);
      setDescription(item.Description);
      setIsAddOverTimeModal(true);
    } else if (type === "DeleteOverTime") {
      setOverTimeId(item.OverTimeId);
      setIsDeleteOverTimeModal(true);
    }
  };

  const handleClose = async (type) => {
    if (type === "AddOverTime") {
      setIsAddOverTimeModal(false);
      resetScreen();
    } else if (type === "EditOverTime") {
      setIsAddOverTimeModal(false);
      setOverTimeId(null);
      resetScreen();
    } else if (type === "DeleteOverTime") {
      setOverTimeId(null);
      resetScreen();
      setIsDeleteOverTimeModal(false);
    }
  };

  const actionBodyTemplateSrNo = (data, props) => {
    return props.rowIndex + 1;
  };

  const validation = () => {
    let IsformValid = true;
    if (CommonConfig.isEmpty(employeeName)) {
      setEmployeeNameErr(true);
      setEmployeeNameErrText("Name is required");
      IsformValid = false;
    } else {
      setEmployeeNameErr(false);
      setEmployeeNameErrText("");
    }
    if (CommonConfig.isEmpty(date)) {
      setDateErr(true);
      setDateErrText("Date is required");
      IsformValid = false;
    } else {
      setDateErr(false);
      setDateErrText("");
    }
    if (CommonConfig.isEmpty(fromTime)) {
      setFromTimeErr(true);
      setFromTimeErrText("Time is required");
      IsformValid = false;
    } else {
      setFromTimeErr(false);
      setFromTimeErrText("");
    }
    if (CommonConfig.isEmpty(toTime)) {
      setToTimeErr(true);
      setToTimeErrText("Time is required");
      IsformValid = false;
    } else {
      setToTimeErr(false);
      setToTimeErrText("");
    }
    if (CommonConfig.isEmpty(description)) {
      setDescriptionErr(true);
      setDescriptionErrText("Description is required");
      IsformValid = false;
    } else {
      setDescriptionErr(false);
      setDescriptionErrText("");
    }
    return IsformValid;
  };

  const AddUpdateOverTime = async (e) => {
    e.preventDefault();
    if (validation()) {
      Loader.show();
      let data = {
        SecurityUserID: securityUserID,
        OverTimeId: overTimeId,
        EmployeeName: employeeName,
        Date: date,
        FromTime: fromTime,
        ToTime: toTime,
        Description: description,
      };
      try {
        api
          .post(APIConstant.path.AddUpdateOverTime, data)
          .then((res) => {
            if (res.success) {
              Toast.success({ message: res.message });
              getOverTimeList();
              Loader.hide();
              resetScreen();
            } else {
              Toast.error({ message: res.message });
              console.log("massage", res);
              Loader.hide();
            }
          })
          .catch((err) => {
            Toast.error({ message: err });
            Loader.hide();
            console.log("massage", err);
          });
      } catch (err) {
        console.log("massage", err);
        Toast.error({ message: err });
        Loader.hide();
      }
    }
  };

  const DeleteOverTime = async () => {
    try {
      Loader.show();
      let data = {
        OverTimeId: overTimeId,
        UserId: securityUserID,
      };
      await api
        .post(APIConstant.path.DeleteOverTime, data)
        .then(async (res) => {
          if (res.success) {
            handleClose("DeleteOverTime");
            setOverTimeId();
            Loader.hide();
            Toast.success({ message: res.message });
            getOverTimeList();
          } else {
            Loader.hide();
            Toast.success({ message: res.message });
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

  const getOverTimeList = async (ID) => {
    try {
      let data = {
        UserId: securityUserID
      };
      await api
        .post(APIConstant.path.getOverTimeDataList, data)
        .then(async (response) => {
          let res = response;
          if (res.success) {
            setOverTimeList(res.data);
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
          onClick={() => handleOpen(rowData, "EditOverTime")}
          tooltip={"Edit"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-edit"></i>
        </Button>
        <Button
          className=""
          onClick={() => handleOpen(rowData, "DeleteOverTime")}
          tooltip={"Delete"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-delete"></i>
        </Button>
      </div>
    );
  };

  return (
    <div className="user-container">
      <div className="card-header">
        <div className="card-title p-d-lg-flex p-ai-center p-w-100">
          <h3 className="p-mb-3 p-mb-lg-0">View Over Time</h3>
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
              className="add-btn add-btn p-button p-component p-jc-center p-w-100"
              onClick={(e) => handleOpen(e, "AddOverTime")}
            >
              <i className="icon-add p-mr-2"></i>Add OT
            </Button>
          </div>
        </div>
      </div>
      <div className="card">
        <DataTable
          globalFilter={globalFilter}
          paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          className="custom-table"
          value={overTimeList}
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
            header="Employee Name"
            style={{ width: "25%" }}
          />
          <Column field="Date" header="Date" style={{ width: "25%" }} />
          <Column
            field="FromTime"
            header="From Time"
            style={{ width: "25%" }}
          />
          <Column field="ToTime" header="To Time" style={{ width: "25%" }} />
          <Column
            field="TotalTime"
            header="Total Time"
            style={{ width: "25%" }}
          />
          <Column
            field="Description"
            header="Description"
            style={{ width: "25%" }}
          />
          <Column header="Action" body={actionBodyTemplate}></Column>
        </DataTable>
      </div>

      {/* Add Confirm Modal */}
      <Sidebar
        visible={isAddOverTimeModal}
        onHide={() => setIsAddOverTimeModal(true)}
        position="right"
        showCloseIcon={false}
        style={{ position: "relative", width: "30%" }}
      >
        <div>
          <div className="card-body">
            <h3>{overTimeId ? "Edit Over Time" : "Add Over Time"}</h3>
            <div className="form-area">
              <div className={"p-grid"}>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label htmlFor="name">
                        Name <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <Dropdown
                        className="p-w-100 p-mt-2"
                        inputId="employeeName"
                        autoFocus={true}
                        // showClear
                        placeholder="Select name"
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
                {/* <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label htmlFor="projectName">
                        Project Name <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <InputText
                        className="p-w-100 p-mt-2"
                        id="projectName"
                        type="text"
                        placeholder="Project Name"
                        value={projectName}
                        autoFocus={true}
                        onChange={(e) => handleChange(e, "projectName")}
                        maxLength={30}
                      />
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {projectNameErr ? projectNameErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label htmlFor="department">
                        Department <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <InputText
                        className="p-w-100 p-mt-2"
                        id="department"
                        type="text"
                        placeholder="Department"
                        value={department}
                        autoFocus={true}
                        onChange={(e) => handleChange(e, "department")}
                        maxLength={30}
                      />
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {departmentErr ? departmentErrText : null}
                    </span>
                  </div>
                </div> */}
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <span className="date-field custom-inputs p-input-icon-right">
                        <label htmlFor="date">
                          Date <span style={{ color: "red" }}>*</span>:{" "}
                        </label>
                        <Calendar
                          className="p-w-100 p-mt-0"
                          id="date"
                          type="date"
                          placeholder="dd/mm/yyyy"
                          value={date}
                          onChange={(e) => handleChange(e, "date")}
                          dateFormat="dd/mm/yy"
                        />
                      </span>
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {dateErr ? dateErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <span className="date-field custom-inputs p-input-icon-right">
                        <label htmlFor="fromTime">
                          Frome time <span style={{ color: "red" }}>*</span>:{" "}
                        </label>
                        <Calendar
                          className="p-w-100 p-mt-0"
                          id="fromTime"
                          type="fromTime"
                          placeholder="HH:MM"
                          value={fromTimeRaw}
                          onChange={(e) => handleChange(e, "fromTime")}
                          timeOnly
                          dateFormat="HH:mm"
                        />
                      </span>
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {fromTimeErr ? fromTimeErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <span className="date-field custom-inputs p-input-icon-right">
                        <label htmlFor="toTime">
                          To time <span style={{ color: "red" }}>*</span>:{" "}
                        </label>
                        <Calendar
                          className="p-w-100 p-mt-0"
                          id="toTime"
                          type="toTime"
                          placeholder="HH:MM"
                          value={toTimeRaw}
                          onChange={(e) => handleChange(e, "toTime")}
                          timeOnly
                          min={fromTime}
                          dateFormat="HH:mm"
                        />
                      </span>
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {toTimeErr ? toTimeErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label htmlFor="description">
                        Description <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <InputText
                        className="p-w-100 p-mt-2"
                        id="description"
                        type="text"
                        placeholder="Description"
                        value={description}
                        autoFocus={true}
                        onChange={(e) => handleChange(e, "description")}
                        maxLength={30}
                      />
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {descriptionErr ? descriptionErrText : null}
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
                  onClick={(e) => AddUpdateOverTime(e)}
                  style={{ height: "35px" }}
                >
                  SUBMIT
                </Button>
                <Button
                  className="btn-dialog-cancel"
                  onClick={(e) => handleClose("AddOverTime")}
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
        header="Delete Over Time"
        visible={isDeleteOverTimeModal}
        className="dialog-popup"
        onHide={(e) => handleClose("DeleteOverTime")}
        draggable={false}
        closable={false}
        position="top"
      >
        <span>Are you sure want to delete the OT ?</span>
        <div className="dialog-footer">
          <button
            className="btn-dialog-cancel"
            onClick={(e) => handleClose("DeleteOverTime")}
          >
            Cancel
          </button>
          <button
            className="btn-dialog-delete"
            onClick={() => DeleteOverTime()}
          >
            Delete
          </button>
        </div>
      </Dialog>
    </div>
  );
};
export default OverTime;
