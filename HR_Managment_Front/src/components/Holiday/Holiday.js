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
import { Sidebar } from "primereact/sidebar";

// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.css';

const Holiday = () => {
  const [holidayId, setHolidayId] = useState(null);
  const [securityUserID, setSecurityUserID] = useState(null);

  const [holidayName, setHolidayName] = useState("");
  const [holidayNameErr, setHolidayNameErr] = useState(false);
  const [holidayNameErrText, setHolidayNameErrText] = useState("");

  const [date, setDate] = useState("");
  const [dateErr, setDateErr] = useState(false);
  const [dateErrText, setDateErrText] = useState("");

  const [globalFilter, setGlobalFilter] = useState("");
  const [holidayList, setHolidayList] = useState([]);
  const [isAddHolidayModal, setIsAddHolidayModal] = useState(false);
  const [isDeleteHolidayModal, setIsDeleteHolidayModal] = useState(false);

  useEffect(() => {
    const loginData = CommonConfig.loginData();
    setSecurityUserID(loginData?.SecurityUserID);
    getHolidayList();
  }, []);

  const resetScreen = async () => {
    // setSecurityUserID(null);
    setHolidayId(null);
    setIsAddHolidayModal(false);

    setHolidayName("");
    setHolidayNameErr(false);
    setHolidayNameErrText("");

    setDate("");
    setDateErr(false);
    setDateErrText("");
  };

  const handleChange = (e, type) => {
    if (type === "globalFilter") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setHolidayName("");
      } else {
        setGlobalFilter(e.target.value);
      }
    }
    if (type === "holidayName") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setHolidayName("");
        setHolidayNameErr(true);
        setHolidayNameErrText("Please enter holiday name");
      } else {
        setHolidayName(e.target.value);
        setHolidayNameErr(false);
        setHolidayNameErrText("");
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
        // setDate(e.value);
        setDateErr(false);
        setDateErrText("");
      }
    }
  };

  const handleOpen = async (item, type) => {
    if (type === "AddHoliday") {
      setIsAddHolidayModal(true);
    } else if (type === "EditHoliday") {
      setIsAddHolidayModal(true);
      setHolidayId(item.HoliDayId);
      setHolidayName(item.HolidayName);
      // setDate(new Date(item.Date));
      const parts = item.Date.split("-");
      setDate(new Date(`${parts[2]}-${parts[1]}-${parts[0]}`));
    } else if (type === "DeleteHoliday") {
      setHolidayId(item.HoliDayId);
      setIsDeleteHolidayModal(true);
    }
  };

  const handleClose = async (type) => {
    if (type === "AddHoliday") {
      setIsAddHolidayModal(false);
      resetScreen();
    } else if (type === "EditHoliday") {
      setIsAddHolidayModal(false);
      setHolidayId(null);
      resetScreen();
    } else if (type === "DeleteHoliday") {
      setHolidayId(null);
      resetScreen();
      setIsDeleteHolidayModal(false);
    }
  };

  const actionBodyTemplateSrNo = (data, props) => {
    return props.rowIndex + 1;
  };

  const validation = () => {
    let IsformValid = true;
    if (CommonConfig.isEmpty(holidayName)) {
      setHolidayNameErr(true);
      setHolidayNameErrText("Holiday name is required");
      IsformValid = false;
    } else {
      setHolidayNameErr(false);
      setHolidayNameErrText("");
    }
    if (CommonConfig.isEmpty(date)) {
      setDateErr(true);
      setDateErrText("Date is required");
      IsformValid = false;
    } else {
      setDateErr(false);
      setDateErrText("");
    }
    return IsformValid;
  };

  const AddUpdateHoliday = async (e) => {
    e.preventDefault();
    if (validation()) {
      Loader.show();
      let data = {
        UserID: securityUserID,
        HolidayId: holidayId,
        HolidayName: holidayName,
        Date: date,
      };
      try {
        api
          .post(APIConstant.path.AddUpdateHoliday, data)
          .then((res) => {
            let response = res.data
            if (res.success) {
              Toast.success({ message: response[0][0].Message });
              Loader.hide();
              resetScreen();
              getHolidayList();
            } else {
              Toast.error({ message: response[0][0].Message });
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

  const DeleteHoliday = async () => {
    try {
      Loader.show();
      let data = {
        HolidayId: holidayId,
        UserId: securityUserID,
      };
      await api
        .post(APIConstant.path.DeleteHoliday, data)
        .then(async (res) => {
          if (res.success) {
            handleClose("DeleteHoliday");
            setHolidayId();
            Loader.hide();
            Toast.success({ message: res.message });
            getHolidayList();
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

  const getHolidayList = async (ID) => {
    try {
      let data = {};
      await api
        .post(APIConstant.path.getHolidayDataList, data)
        .then(async (response) => {
          let res = response;
          if (res.success) {
            setHolidayList(res.data[0]);
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
          onClick={() => handleOpen(rowData, "EditHoliday")}
          tooltip={"Edit"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-edit"></i>
        </Button>
        <Button
          className=""
          onClick={() => handleOpen(rowData, "DeleteHoliday")}
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
          <h3 className="p-mb-3 p-mb-lg-0">View Holiday</h3>
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
              onClick={(e) => handleOpen(e, "AddHoliday")}
            >
              <i className="icon-add p-mr-2"></i>Add Holiday
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
          value={holidayList}
          scrollable
          scrollHeight="calc(100vh - 203px)"
        >
          <Column
            field="Index"
            header="Sr.No"
            body={actionBodyTemplateSrNo}
            style={{ maxWidth: 150 }}
          />
          <Column field="Date" header="Date" style={{ width: "25%" }} />
          <Column
            field="HolidayName"
            header="Holiday"
            style={{ width: "25%" }}
          />
          <Column header="Action" body={actionBodyTemplate}></Column>
        </DataTable>
      </div>

      {/* Add Confirm Modal */}
      <Sidebar
        visible={isAddHolidayModal}
        onHide={() => setIsAddHolidayModal(true)}
        position="right"
        showCloseIcon={false}
        style={{ position: "relative" }}
      >
        <div>
          <div className="card-body">
            <h3>{holidayId ? "Edit Holiday" : "Add Holiday"}</h3>
            <div className="form-area">
              <div className={"p-grid"}>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label htmlFor="name">
                        Holiday name <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <InputText
                        className="p-w-100 p-mt-2"
                        id="holidayName"
                        type="text"
                        placeholder="Holiday name"
                        value={holidayName}
                        autoFocus={true}
                        onChange={(e) => handleChange(e, "holidayName")}
                        maxLength={30}
                      />
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {holidayNameErr ? holidayNameErrText : null}
                    </span>
                  </div>
                </div>
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
                        <i
                          className="pi pi-calendar"
                          style={{
                            fontSize: "1.2rem",
                            color: "#007ad9",
                          }}
                        ></i>
                      </span>
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {dateErr ? dateErrText : null}
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
                  onClick={(e) => AddUpdateHoliday(e)}
                  style={{ height: "35px" }}
                >
                  SUBMIT
                </Button>
                <Button
                  className="btn-dialog-cancel"
                  onClick={(e) => handleClose("AddHoliday")}
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
        header="Delete Holiday"
        visible={isDeleteHolidayModal}
        className="dialog-popup"
        onHide={(e) => handleClose("DeleteHoliday")}
        draggable={false}
        closable={false}
        position="top"
      >
        <span>Are you sure want to delete the Holiday ?</span>
        <div className="dialog-footer">
          <button
            className="btn-dialog-cancel"
            onClick={(e) => handleClose("DeleteHoliday")}
          >
            Cancel
          </button>
          <button className="btn-dialog-delete" onClick={() => DeleteHoliday()}>
            Delete
          </button>
        </div>
      </Dialog>
    </div>
  );
};
export default Holiday;
