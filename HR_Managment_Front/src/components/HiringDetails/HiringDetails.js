/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import api from "../../utils/apiClient";
import CommonConfig from "../../utils/constant";
import APIConstant from "../../utils/PathConstants";
import { Sidebar } from "primereact/sidebar";
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

const HiringDetails = (props) => {
  const [employeeId, setEmployeeId] = useState(null);
  const [securityUserID, setSecurityUserID] = useState(null);

  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [nameErrText, setNameErrText] = useState("");

  const [mobileNo, setMobileNo] = useState("");
  const [mobileNoErr, setMobileNoErr] = useState(false);
  const [mobileNoErrText, setMobileNoErrText] = useState("");

  const [occupation, setOccupation] = useState("");
  const [occupationErr, setOccupationErr] = useState(false);
  const [occupationErrText, setOccupationErrText] = useState("");

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrText, setEmailErrText] = useState("");

  const [address, setAddress] = useState("");
  const [addressErr, setAddressErr] = useState(false);
  const [addressErrText, setAddressErrText] = useState("");

  const [globalFilter, setGlobalFilter] = useState("");
  const [filteredHiringList, setFilteredHiringList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [showHiringList, setShowHiringList] = useState(true);
  const [addEmployeModal, setAddEmployeModal] = useState(false);
  const [isDeleteEmployeeModal, setIsDeleteEmployeeMod] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const loginData = CommonConfig.loginData();
    setSecurityUserID(loginData?.UserId);
    getEmployeeList();
  }, []);

  useEffect(() => {
    const filteredList = employeeList.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(globalFilter.toLowerCase())
      )
    );
    setFilteredHiringList(filteredList);
  }, [globalFilter, employeeList]);

  const resetScreen = async () => {
    // setSecurityUserID(null);
    setEmployeeId(null);
    setAddEmployeModal(false);

    setName("");
    setNameErr(false);
    setNameErrText("");
    setMobileNo("");
    setMobileNoErr(false);
    setMobileNoErrText("");

    setOccupation("");
    setOccupationErr(false);
    setOccupationErrText("");

    setEmail("");
    setEmailErr(false);
    setEmailErrText("");

    setAddress("");
    setAddressErr(false);
    setAddressErrText("");
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
    if (type === "occupation") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setOccupation("");
        setOccupationErr(true);
        setOccupationErrText("Birth date is required");
      } else {
        setOccupation(e.target.value);
        setOccupationErr(false);
        setOccupationErrText("");
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
    // if (type === 'photo') {
    //     if (CommonConfig.isEmpty(e.target.value)) {
    //         setPhoto("");
    //         setPhotoErr(true);
    //         setPhotoErrText("photo is required")
    //     } else {
    //         setPhoto(e.target.value);
    //         setPhotoErr(false);
    //         setPhotoErrText("");
    //     }
    // }
  };

  const handleOpen = async (item, type) => {
    if (type === "AddEmployee") {
      setAddEmployeModal(true);
      // history.push('/addUser');
    } else if (type === "EditEmployee") {
      setEmployeeId(item.EmployeeId);
      setName(item.EmployeeName);
      setMobileNo(item.MobileNo);
      setOccupation(item.Occupation);
      setEmail(item.Email);
      setAddress(item.Address);
      setAddEmployeModal(true);
    } else if (type === "DeleteEmployee") {
      setEmployeeId(item.EmployeeId);
      setIsDeleteEmployeeMod(true);
    }
  };

  const handleClose = async (type) => {
    if (type === "AddEmployee") {
      setAddEmployeModal(false);
      resetScreen();
    } else if (type === "DeleteEmployee") {
      setEmployeeId(null);
      setIsDeleteEmployeeMod(false);
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
    if (CommonConfig.isEmpty(email)) {
      setEmailErr(true);
      setEmailErrText("Email ID is required");
      IsformValid = false;
    } else {
      setEmailErr(false);
      setEmailErrText("");
    }
    if (CommonConfig.isEmpty(address)) {
      setAddressErr(true);
      setAddressErrText("Address is required");
      IsformValid = false;
    } else {
      setAddressErr(false);
      setAddressErrText("");
    }
    if (CommonConfig.isEmpty(occupation)) {
      setOccupationErr(true);
      setOccupationErrText("Occupation is required");
      IsformValid = false;
    } else {
      setOccupationErr(false);
      setOccupationErrText("");
    }
    if (CommonConfig.isEmpty(mobileNo)) {
      setMobileNoErr(true);
      setMobileNoErrText("Mobile number is required");
      IsformValid = false;
    } else {
      setMobileNoErr(false);
      setMobileNoErrText("");
    }
    //   if (CommonConfig.isEmpty(photo)) {
    //     setPhotoErr(true);
    //     setPhotoErrText("Profile photo is required");
    //     IsformValid = false;
    //   } else {
    //     setPhotoErr(false);
    //     setPhotoErrText("");
    //   }

    return IsformValid;
  };

  const AddUpdateEmployee = async (e) => {
    e.preventDefault();
    if (validation()) {
      Loader.show();
      let data = {
        EmployeeId: employeeId,
        UserId: securityUserID,
        EmployeeName: name,
        MobileNo: mobileNo,
        Occupation: occupation,
        Email: email,
        Address: address,
      };
      try {
        api
          .post(APIConstant.path.AddHiringEmployee, data)
          .then((res) => {
            const response = res.data;
            if (res.success) {
              Toast.success({ message: res.message });
              Loader.hide();
              getEmployeeList();
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

  const DeleteEmployee = async () => {
    try {
      Loader.show();
      let data = {
        EmployeeId: employeeId,
        UserID: securityUserID,
      };
      await api
        .post(APIConstant.path.DeleteHiringEmployee, data)
        .then(async (res) => {
          if (res.success) {
            handleClose("DeleteEmployee");
            getEmployeeList();
            setEmployeeId();
            Loader.hide();
            Toast.success({ message: res.message });
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

  const getEmployeeList = async (ID) => {
    try {
      let data = {};
      await api
        .post(APIConstant.path.GetHiringEmployeeDataList, data)
        .then(async (response) => {
          let res = response;
          if (res.success) {
            setEmployeeList(response.data.recordset);
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
          onClick={() => handleOpen(rowData, "EditEmployee")}
          tooltip={"Edit"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-edit"></i>
        </Button>
        <Button
          className=""
          onClick={() => handleOpen(rowData, "DeleteEmployee")}
          tooltip={"Delete"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-delete"></i>
        </Button>
        {/* <Button
          className=""
          onClick={() => handleOpen(rowData, "DeleteEmployee")}
          tooltip={"view"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-view"></i>
        </Button> */}
      </div>
    );
  };

  const toggleHiringList = () => {
    setShowHiringList(!showHiringList);
  };
  return (
    <div className="user-container">
      <div className="card-header">
        <div className="card-title p-d-lg-flex p-ai-center p-w-100">
          <h3 className="p-mb-3 p-mb-lg-0">View Hiring Employee</h3>
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
              onClick={(e) => handleOpen(e, "AddEmployee")}
            >
              <i className="icon-add p-mr-2"></i>Add Employee
            </Button>
            <Button
              className="p-button p-component p-jc-center"
              onClick={toggleHiringList}
            >
              {!showHiringList ? (
                <i className="icon-dashboard"></i>
              ) : (
                <i className="pi pi-list"></i>
              )}
            </Button>
          </div>
        </div>
      </div>
      {!showHiringList && (
        <div className="card">
          <DataTable
            globalFilter={globalFilter}
            paginator
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            className="custom-table"
            value={employeeList}
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
              field="MobileNo"
              header="Mobile No"
              style={{ width: "25%" }}
            />
            <Column field="Email" header="Email ID" style={{ width: "25%" }} />
            <Column field="Address" header="Address" style={{ width: "25%" }} />
            <Column
              field="Occupation"
              header="Occupation"
              style={{ width: "25%" }}
            />
            <Column header="Action" body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
      )}
      {showHiringList && (
        <div className="card-body">
          <div className="dashboard-container p-grid">
            {filteredHiringList.map((item, index) => (
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
                        Name: {item.EmployeeName}
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
                            onClick={() => handleOpen(item, "EditLeave")}
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
                            onClick={() => handleOpen(item, "DeleteLeave")}
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
                    <div className="">MobileNo: {item.MobileNo}</div>
                    <div className=""> Email Id: {item.Email}</div>
                    <div
                      className=""
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="">Occupation: {item.Occupation}</div>
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
        visible={addEmployeModal}
        onHide={() => setAddEmployeModal(true)}
        position="right"
        showCloseIcon={false}
        style={{ position: "relative" }}
      >
        <div>
          <div className="card-body">
            <h3>{employeeId ? "Edit Employee" : "Add Employee"}</h3>
            <div className="form-area">
              <div className={"p-grid"}>
                <div className="p-col-12 p-md-12 p-pt-2">
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

                <div className="p-col-12 p-md-12 p-pt-2">
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

                <div className="p-col-12 p-md-12 p-pt-2">
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

                <div className="p-col-12 p-md-12 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label htmlFor="occupation">
                        Occupation <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <InputText
                        className="p-w-100 p-mt-2"
                        id="occupation"
                        type="text"
                        placeholder="Occupation"
                        value={occupation}
                        onChange={(e) => handleChange(e, "occupation")}
                        // maxLength={30}
                      />
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {occupationErr ? occupationErrText : null}
                    </span>
                  </div>
                </div>

                <div className="p-col-12 p-md-12 p-pt-2">
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
                  onClick={(e) => handleClose("AddEmployee")}
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
        header="Delete Employee"
        visible={isDeleteEmployeeModal}
        className="dialog-popup"
        onHide={(e) => handleClose("DeleteEmployee")}
        draggable={false}
        closable={false}
        position="top"
      >
        <span>Are you sure want to delete the person ?</span>
        <div className="dialog-footer">
          <button
            className="btn-dialog-cancel"
            onClick={(e) => handleClose("DeleteEmployee")}
          >
            {" "}
            Cancel{" "}
          </button>
          <button
            className="btn-dialog-delete"
            onClick={() => DeleteEmployee()}
          >
            {" "}
            Delete{" "}
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default HiringDetails;
