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
import { Sidebar } from "primereact/sidebar";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from 'primereact/inputtextarea';
        

const Announcement = () => {
  const [eventId, setEventId] = useState(null);
  const [securityUserID, setSecurityUserID] = useState(null);
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [nameErrText, setNameErrText] = useState("");

  const [date, setDate] = useState("");
  const [dateErr, setDateErr] = useState(false);
  const [dateErrText, setDateErrText] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [descriptionErrText, setDescriptionErrText] = useState("");

  const [globalFilter, setGlobalFilter] = useState("");
  const [userType, setUserType] = useState("");
  const [announcementList, setAnnouncementList] = useState([]);
  const [addEventModal, setAddEventModal] = useState(false);
  const [isDeleteEventModal, setIsDeleteEventModal] = useState(false);

  useEffect(() => {
    const loginData = CommonConfig.loginData();
    setSecurityUserID(loginData?.UserId);
    setUserType(loginData.UserType);
    getEventList();
  }, []);

  const resetScreen = async () => {
    // setSecurityUserID(null);
    setEventId(null);
    setAddEventModal(false);

    setName("");
    setNameErr(false);
    setNameErrText("");

    setDate("");
    setDateErr(false);
    setDateErrText("");

    setDescription("");
    setDescriptionErr(false);
    setDescriptionErrText("");
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
    if (type === "date") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setDate("");
        setDateErr(true);
        setDateErrText("Date is required");
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
    if (type === "description") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setDescription("");
        setDescriptionErr(true);
        setDescriptionErrText("Description is required");
      } else {
        setDescription(e.target.value);
        setDescriptionErr(false);
        setDescriptionErrText("");
      }
    }
  };

  const handleOpen = async (item, type) => {
    if (type === "AddEvent") {
      setAddEventModal(true);
      // history.push('/addUser');
    } else if (type === "EditEvent") {
      setEventId(item.EventId);
      setName(item.EventName);
      const parts = item.Date.split("-");
      setDate(new Date(`${parts[2]}-${parts[1]}-${parts[0]}`));
      setDescription(item.Description);
      setAddEventModal(true);
    } else if (type === "DeleteEvent") {
      setEventId(item.EventId);
      setIsDeleteEventModal(true);
    }
  };

  const handleClose = async (type) => {
    if (type === "AddEvent") {
      setAddEventModal(false);
      resetScreen();
    } else if (type === "DeleteEvent") {
      setEventId(null);
      setIsDeleteEventModal(false);
    }
  };

  const actionBodyTemplateSrNo = (data, props) => {
    return props.rowIndex + 1;
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
    if (CommonConfig.isEmpty(date)) {
      setDateErr(true);
      setDateErrText("Date is required");
      IsformValid = false;
    } else {
      setDateErr(false);
      setDateErrText("");
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

  const AddUpdateEvent = async (e) => {
    e.preventDefault();
    if (validation()) {
      Loader.show();
      let data = {
        UserID: securityUserID,
        EventId: eventId,
        EventName: name,
        Date: date,
        Description: description,
      };
      try {
        api
          .post(APIConstant.path.AddUpdateEvent, data)
          .then((res) => {
            const response = res.data;
            if (res.success) {
              Toast.success({ message: res.message });
              getEventList();
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

  const DeleteEvent = async () => {
    try {
      Loader.show();
      let data = {
        EventId: eventId,
        UserId: securityUserID,
      };
      await api
        .post(APIConstant.path.DeleteEvent, data)
        .then(async (res) => {
          if (res.success) {
            handleClose("DeleteEvent");
            getEventList();
            setEventId();
            Loader.hide();
          } else {
            Loader.hide();
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

  const getEventList = async (ID) => {
    try {
      let data = {};
      await api
        .post(APIConstant.path.getEventDataList, data)
        .then(async (response) => {
          let res = response;
          if (res.success) {
            setAnnouncementList(res.data.recordset);
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
          onClick={() => handleOpen(rowData, "EditEvent")}
          tooltip={"Edit"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-edit"></i>
        </Button>
        <Button
          className=""
          onClick={() => handleOpen(rowData, "DeleteEvent")}
          tooltip={"Delete"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-delete"></i>
        </Button>
        {/* <Button
          className=""
          onClick={() => handleOpen(rowData, "ViewEvent")}
          tooltip={"view"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-view"></i>
        </Button> */}
      </div>
    );
  };

  return (
    <div className="user-container">
      <div className="card-header">
        <div className="card-title p-d-lg-flex p-ai-center p-w-100">
          <h3 className="p-mb-3 p-mb-lg-0">View Announcement/Event</h3>
          <div className="p-ml-auto p-d-lg-flex p-ai-center">
            <span className="searchbar-area">
              <InputText
                type="search"
                // onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Global Search"
                size="30"
              />
              <i className="icon-search"></i>
            </span>
          </div>
          {userType === "Admin" ? (
            <div className="card-actions p-ml-2">
              <Button
                type="button"
                className="add-btn add-btn p-button p-component p-jc-center p-w-100"
                onClick={(e) => handleOpen(e, "AddEvent")}
              >
                <i className="icon-add p-mr-2"></i>Add Event
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <hr />
      <div className="card">
        <DataTable
          globalFilter={globalFilter}
          paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          className="custom-table"
          value={announcementList}
          scrollable
          scrollHeight="calc(100vh - 203px)"
        >
          {/* <Column
            field="Index"
            header="Sr.No"
            body={actionBodyTemplateSrNo}
            style={{ maxWidth: 150 }}
          /> */}
          <Column
            field="EventName"
            header="Event name"
            style={{ width: "25%" }}
          />
          <Column field="Date" header="Date" style={{ width: "25%" }} />
          <Column
            field="Description"
            header="Description"
            style={{ width: "25%" }}
          />
          {userType === "Admin" ? (
            <Column header="Action" body={actionBodyTemplate}></Column>
          ) : null}
        </DataTable>
      </div>

      {/* Add Confirm Modal */}
      <Sidebar
        visible={addEventModal}
        onHide={() => setAddEventModal(true)}
        position="right"
        showCloseIcon={false}
        style={{ position: "relative" }}
      >
        <div>
          <div className="card-body">
            <h3>{eventId ? "Edit Event" : "Add Event"}</h3>
            <div className="form-area">
              <div className={"p-grid"}>
                <div className="p-col-12 p-md-12 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label htmlFor="name">
                        Event name <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <InputText
                        className="p-w-100 p-mt-2"
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        autoFocus={true}
                        onChange={(e) => handleChange(e, "name")}
                      />
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {nameErr ? nameErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-12 p-pt-2">
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
                      {dateErr ? dateErrText : null}
                    </span>
                  </div>
                </div>

                <div className="p-col-12 p-md-12 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label htmlFor="description">
                        Description <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <InputTextarea
                        className="p-w-100 p-mt-2"
                        id="description"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => handleChange(e, "description")}
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
                  onClick={(e) => AddUpdateEvent(e)}
                  style={{ height: "35px" }}
                >
                  Submit
                </Button>
                <Button
                  className="btn-dialog-cancel"
                  onClick={(e) => handleClose("AddEvent")}
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
        header="Delete Event"
        visible={isDeleteEventModal}
        className="dialog-popup"
        onHide={(e) => handleClose("DeleteEvent")}
        draggable={false}
        closable={false}
        position="top"
      >
        <span>Are you sure want to delete the event ?</span>
        <div className="dialog-footer">
          <button
            className="btn-dialog-cancel"
            onClick={(e) => handleClose("DeleteEvent")}
          >
            {" "}
            Cancel{" "}
          </button>
          <button className="btn-dialog-delete" onClick={() => DeleteEvent()}>
            {" "}
            Delete{" "}
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default Announcement;
