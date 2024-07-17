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
import { useHistory } from "react-router-dom";
import { downloadFile } from '../../utils/utils';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.css';

const Employee = (props) => {
  const [employeeId, setEmployeeId] = useState(null);
  const [securityUserID, setSecurityUserID] = useState(null);
  const [viewEmployeeData, setViewEmployeeData] = useState({});

  const [globalFilter, setGlobalFilter] = useState("");
  const [personList, setEmployeeList] = useState([]);
  const [isviewEmployeeModal, setIsviewEmployeeModal] = useState(false);
  const [isDeleteEmployeeModal, setIsDeleteEmployeeMod] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const loginData = CommonConfig.loginData();
    setSecurityUserID(loginData?.SecurityUserID);
    getEmployeeList();
  }, []);

  const resetScreen = async () => {
    setEmployeeId(null);
    // setSecurityUserID(null);
    setViewEmployeeData({});
    setGlobalFilter("");
    setIsviewEmployeeModal(false);
    setIsDeleteEmployeeMod(false);
  };

  const handleDownload = (fileUrl) => {
    downloadFile(fileUrl);
  };

  const handleOpen = async (item, type) => {
    if (type === "AddEmployee") {
      history.push('/add-employee');
    } else if (type === "EditEmployee") {
      history.push('/add-employee', { EmployeeId: item.EmployeeId })
    } else if (type === "DeleteEmployee") {
      setEmployeeId(item.EmployeeId);
      setIsDeleteEmployeeMod(true);
    } else if (type === "ViewEmployee") {
      setViewEmployeeData(item);
      setIsviewEmployeeModal(true);
    }
  };

  const handleClose = async (type) => {
    if (type === "ViewEmployee") {
      resetScreen();
      setIsviewEmployeeModal(false);
    } else if (type === "DeleteEmployee") {
      resetScreen();
      setIsDeleteEmployeeMod(false);
    }
  };

  const actionBodyTemplateSrNo = (data, props) => {
    return props.rowIndex + 1;
  };

  const DeleteEmployee = async () => {
    try {
      Loader.show();
      let data = {
        EmployeeId: employeeId,
        UserId: securityUserID,
      };
      await api
        .post(APIConstant.path.DeleteCompanyEmployee, data)
        .then(async (res) => {
          if (res.success) {
            handleClose("DeleteEmployee");
            getEmployeeList();
            resetScreen();
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
      let data = {
        UserType: "Admin"
      };
      await api
        .post(APIConstant.path.getCompanyEmployeeDataList, data)
        .then(async (res) => {
          if (res.success) {
            setEmployeeList(res.data[0]);
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
        <Button
          className=""
          onClick={() => handleOpen(rowData, "ViewEmployee")}
          tooltip={"view"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-view"></i>
        </Button>
      </div>
    );
  };

  return (
    <div className="user-container">
      <div className="card-header">
        <div className="card-title p-d-lg-flex p-ai-center p-w-100">
          <h3 className="p-mb-3 p-mb-lg-0">View Company Employee</h3>
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
              onClick={(e) => handleOpen(e, "AddEmployee")}
            >
              <i className="icon-add p-mr-2"></i>Add Employee
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
          value={personList}
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
          <Column
            field="BirthDate"
            header="Birth date"
            style={{ width: "25%" }}
          />
          <Column field="Address" header="Address" style={{ width: "25%" }} />
          {/* <Column
            field="ProfilePhoto"
            header="Profile photo"
            style={{ width: "25%" }}
          /> */}
          <Column header="Action" body={actionBodyTemplate}></Column>
        </DataTable>
      </div>

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
            Cancel
          </button>
          <button
            className="btn-dialog-delete"
            onClick={() => DeleteEmployee()}
          >
            Delete
          </button>
        </div>
      </Dialog>

      {/* view Confirm Modal */}
      <Dialog
        header="View Employee Data"
        visible={isviewEmployeeModal}
        className="dialog-popup"
        onHide={(e) => handleClose("ViewEmployee")}
        draggable={false}
        closable={false}
        position="top"
      >
        <div className='modalBody'>
          <div className={"p-grid"}>
            <div className="p-col-12 p-md-12 p-pl-0 p-py-0">
              <div className={"p-grid"}>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <span><b>Employee name: </b></span>
                    <p> {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData?.EmployeeName) ? viewEmployeeData?.EmployeeName : '-'}</p>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <span><b>Mobile No: </b></span>
                    <p> {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData?.MobileNo) ? viewEmployeeData?.MobileNo : '-'}</p>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <span><b>Email: </b></span>
                    <p> {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData?.Email) ? viewEmployeeData?.Email : '-'}</p>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <span><b>Birth date: </b></span>
                    <p> {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData?.BirthDate) ? viewEmployeeData?.BirthDate : '-'}</p>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <span><b>Address: </b></span>
                    <p> {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData?.Address) ? viewEmployeeData?.Address : '-'}</p>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <span><b>Joining date: </b></span>
                    <p> {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData?.JoiningDate) ? viewEmployeeData?.JoiningDate : '-'}</p>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <span><b>Job title: </b></span>
                    <p> {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData?.JobTitle) ? viewEmployeeData?.JobTitle : '-'}</p>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <span><b>Manager: </b></span>
                    <p> {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData?.Manager) ? viewEmployeeData?.Manager : '-'}</p>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <span><b>Basic Salary: </b></span>
                    <p> {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData?.Salary) ? viewEmployeeData?.Salary : '-'}</p>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <span><b>Job type: </b></span>
                    <p> {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData?.JobType) ? viewEmployeeData?.JobType : '-'}</p>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <span><b>WorkLocation: </b></span>
                    <p> {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData?.WorkLocation) ? viewEmployeeData?.WorkLocation : '-'}</p>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <span><b>Emergency contact: </b></span>
                    <p> {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData?.EmergencyContact) ? viewEmployeeData?.EmergencyContact : '-'}</p>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <span><b>Qualification: </b></span>
                    <p> {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData?.qualification) ? viewEmployeeData?.qualification : '-'}</p>
                  </div>
                </div>
                {viewEmployeeData?.IsExperience === 1 && (
                  <>
                    <div className="p-col-12 p-md-6 p-pt-2">
                      <div className="p-w-100 ">
                        <span><b>Previous job start date: </b></span>
                        <p> {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData?.ExpStartDate) ? viewEmployeeData?.ExpStartDate : '-'}</p>
                      </div>
                    </div>
                    <div className="p-col-12 p-md-6 p-pt-2">
                      <div className="p-w-100 ">
                        <span><b>Previous job end date: </b></span>
                        <p> {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData?.ExpEndDate) ? viewEmployeeData?.ExpEndDate : '-'}</p>
                      </div>
                    </div>
                    <div className="p-col-12 p-md-6 p-pt-2">
                      <div className="p-w-100 ">
                        <span><b>Description: </b></span>
                        <p> {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData?.Description) ? viewEmployeeData?.Description : '-'}</p>
                      </div>
                    </div>
                  </>
                )}
                <div className='p-col-12 p-md-6 p-pt-2'>
                  {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData.ProfilePhoto) ?
                    <Button className='add-btn p-button p-component p-w-100 p-justify-between' tooltip={"Endorsement Document"} onClick={() => { window.open(viewEmployeeData.ProfilePhoto, '_blank') }} tooltipOptions={{ className: 'bluegray-tooltip', position: 'top' }}>
                      <div>
                        <i className='pi pi-file'></i> ProfilePhoto
                      </div>
                      <Button className='add-btn p-button p-component'><i className='pi pi-download' onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(viewEmployeeData.ProfilePhoto);
                      }}></i></Button>
                    </Button> : null}
                </div>
                <div className='p-col-12 p-md-6 p-pt-2'>
                  {!CommonConfig.isObjectEmpty(viewEmployeeData) && !CommonConfig.isEmpty(viewEmployeeData.AadharCard) ?
                    <Button className='add-btn p-button p-component p-w-100 p-justify-between' tooltip={"Endorsement Document"} onClick={() => { window.open(viewEmployeeData.AadharCard, '_blank') }} tooltipOptions={{ className: 'bluegray-tooltip', position: 'top' }}>
                      <div>
                        <i className='pi pi-file'></i> AadharCard
                      </div>
                      <Button className='add-btn p-button p-component'><i className='pi pi-download' onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(viewEmployeeData.AadharCard);
                      }}></i></Button>
                    </Button> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dialog-footer">
          <button
            className="btn-dialog-cancel"
            onClick={(e) => handleClose("ViewEmployee")}
          >
            Cancel
          </button>
        </div>
      </Dialog>
    </div>
  );
};
export default Employee;
