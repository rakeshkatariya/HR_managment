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
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { useHistory } from "react-router-dom";

// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.css';

const Task = () => {
  const [taskId, setTaskId] = useState(null);
  const [securityUserID, setSecurityUserID] = useState(null);

  const [employeeName, setEmployeeName] = useState("");
  const [employeeNameErr, setEmployeeNameErr] = useState(false);
  const [employeeNameErrText, setEmployeeNameErrText] = useState("");

  const [assignDate, setAssignDate] = useState("");
  const [assignDateErr, setAssignDateErr] = useState(false);
  const [assignDateErrText, setAssignDateErrText] = useState("");

  const [dueDate, setDueDate] = useState("");
  const [dueDateErr, setDueDateErr] = useState(false);
  const [dueDateErrText, setDueDateErrText] = useState("");

  const [observer, setObserver] = useState("");
  const [observerErr, setObserverErr] = useState(false);
  const [observerErrText, setObserverErrText] = useState("");
  const [observerList, setObserverList] = useState([
    { label: "OmBhai", value: 1 },
    { label: "Aakashbhai", value: 2 },
    { label: "Dharavbhai", value: 3 },
    { label: "Dharmikbhai", value: 4 },
    { label: "Rajubhai", value: 5 },
    { label: "Arjunbhai", value: 6 },
    { label: "Rakeshbhai", value: 7 },
    { label: "Bhavybhai", value: 8 },
    { label: "Meetbhai", value: 9 },
  ]);

  const [multipleTask, setMultipleTask] = useState([
    {
        Task:'',
        Project: '',
        Assignee: '',
        TaskStatus: '',
        IsItemEdit: true,
        IsItemNew: true
    }
]);

  const [taskStatusList, setTaskStatusList] = useState([
    { label: "Done", value: "1" },
    { label: "In Progress", value: "2" },
    { label: "Pending", value: "3" },
    { label: "Review", value: "4" },
  ]);

  const [assigneeList,setAssigneeList] = useState([
    { label: "Dharmeshbhai", value: 1 },
  ])

  const [globalFilter, setGlobalFilter] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isAddTaskModal, setAddTaskModal] = useState(false);
  const [isDeleteTaskModal, setIsDeleteTaskModal] = useState(false);

  useEffect(() => {
    const loginData = CommonConfig.loginData();
    // setSecurityUserID(loginData?.UserId);
    getTaskList();
  }, []);

  const resetScreen = async () => {
    // setSecurityUserID(null);
    setTaskId(null);
    setAddTaskModal(false);

    setEmployeeName("");
    setEmployeeNameErr(false);
    setEmployeeNameErrText("");

    setAssignDate("");
    setAssignDateErr(false);
    setAssignDateErrText("");

    setDueDate("");
    setDueDateErr(false);
    setDueDateErrText("");

    setMultipleTask([
        {
            Task:'',
            Project: '',
            Assignee: '',
            TaskStatus: '',
            IsItemEdit: true,
            IsItemNew: true
        }
    ]);
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
    if (type === "assignDate") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setAssignDate("");
        setAssignDateErr(true);
        setAssignDateErrText("Please enter assigndate");
      } else {
        setAssignDate(e.target.value);
        setAssignDateErr(false);
        setAssignDateErrText("");
      }
    }
    if (type === "dueDate") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setDueDate("");
        setDueDateErr(true);
        setDueDateErrText("Please enter due date");
      } else {
        setDueDate(e.target.value);
        setDueDateErr(false);
        setDueDateErrText("");
      }
    }    
    if (type === "observer") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setObserver("");
        setObserverErr(true);
        setObserverErrText("Please observer name");
      } else {
        setObserver(e.target.value);
        setObserverErr(false);
        setObserverErrText("");
      }
    }
   
  };

  const handleOpen = async (item, type) => {
    if (type === "AddTask") {
      setAddTaskModal(true);
      // history.push('/addUser');
    } else if (type === "DeleteTask") {
      setTaskId(item.value);
      setIsDeleteTaskModal(true);
    }
  };

  const handleClose = async (type) => {
    if (type === "AddTask") {
      setAddTaskModal(false);
      resetScreen();
    } else if (type === "DeleteTask") {
      setTaskId(null);
      resetScreen();
      setIsDeleteTaskModal(false);
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
    if (CommonConfig.isEmpty(assignDate)) {
      setAssignDateErr(true);
      setAssignDateErrText("Assign date is required");
      IsformValid = false;
    } else {
      setAssignDateErr(false);
      setAssignDateErrText("");
    }
    if (CommonConfig.isEmpty(assignDate)) {
      setDueDateErr(true);
      setDueDateErrText("End date is required");
      IsformValid = false;
    } else {
      setDueDateErr(false);
      setDueDateErrText("");
    }
    
    if (CommonConfig.isEmpty(observer)) {
      setObserverErr(true);
      setObserverErrText("Observer name is required");
      IsformValid = false;
    } else {
      setObserverErr(false);
      setObserverErrText("");
    }
          return IsformValid;
  };

  const AddUpdateTask = async (e) => {
    e.preventDefault();
    if (validation()) {
      Loader.show();
      let data = {
        // SecurityUserID: securityUserID,
        Name: employeeName,
        Status: "Active",
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
    }
  };

  const DeleteTask = async () => {
    try {
      Loader.show();
      let data = {
        ID: taskId,
        UserID: securityUserID,
      };
      await api
        .post(APIConstant.path.DeleteMasterByType, data)
        .then(async (res) => {
          if (res.success) {
            handleClose("DeleteTask");
            setTaskId();
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

  const getTaskList = async (ID) => {
    try {
      let data = {};
      await api
        .post(APIConstant.path.GetStringMap, data)
        .then(async (response) => {
          let res = response;
          if (res.success) {
            setTaskList(res.data);
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
          onClick={() => handleOpen(rowData, "EditTask")}
          tooltip={"Edit"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-edit"></i>
        </Button>
        <Button
          className=""
          onClick={() => handleOpen(rowData, "DeleteTask")}
          tooltip={"Delete"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-delete"></i>
        </Button>
        <Button
          className=""
          onClick={() => handleOpen(rowData, "DeleteTask")}
          tooltip={"view"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-view"></i>
        </Button>
      </div>
    );
  };

  const handleInputChangeItem = (e, idx) => {
    let tempList = multipleTask;
    tempList[idx][e.target.name] = e.target.value;
    setMultipleTask([...tempList]);
};

const actionBody = (rowData, props) => {
    return (<>
        {rowData.IsItemEdit ?
            <div className="p-d-flex p-align-center">
                {rowData.IsItemNew ?
                    <Button
                        className="add-btn p-button p-component p-mr-2"
                        onClick={(e) => AddEditCareOffPerson(props.rowIndex)}
                        tooltip={"Add"} tooltipOptions={{ className: 'bluegray-tooltip', position: 'top' }}
                    >
                        <i className="icon-add p-m-0"></i>
                    </Button> :
                    <>
                        <Button
                            className=""
                            onClick={(e) => AddEditCareOffPerson(props.rowIndex)}
                            tooltip={"Save"} tooltipOptions={{ className: 'bluegray-tooltip', position: 'top' }}
                        >
                            <i className="icon-correct"></i>
                        </Button>
                        <Button
                            className=""
                            onClick={(e) => {
                                let tempList = multipleTask;
                                tempList[props.rowIndex]["IsItemEdit"] = false;
                                setMultipleTask([...tempList]);
                            }}
                            tooltip={"Cancel"} tooltipOptions={{ className: 'bluegray-tooltip', position: 'top' }}
                        >
                            <i className="icon-cancel"></i>
                        </Button></>}

            </div> : <div className="p-d-flex p-pt-4 p-align-center">
                <Button
                    className="add-btn p-button p-component p-mr-2"
                    onClick={(e) => IsEditCareOffPerson(e, props.rowIndex)}
                    tooltip={"Edit"} tooltipOptions={{ className: 'bluegray-tooltip', position: 'top' }}
                >
                    <i className="icon-edit p-m-0"></i>
                </Button>
                <Button
                    className="add-btn p-button p-component p-mr-2"
                    onClick={(e) => deleteCareOffPerson(props.rowIndex)}
                    tooltip={"Delete"} tooltipOptions={{ className: 'bluegray-tooltip', position: 'top' }}
                >
                    <i className="icon-delete p-m-0"></i>
                </Button>
            </div>}</>)
}

const srNoBody = (rowData, props) => {
    return props.rowIndex + 1;
}

const taskBody = (rowData, props) => {
    return (<> {rowData.IsItemEdit ? <>
        <div className="">
            <InputText
                id={`Task${props.rowIndex}`}
                name='Task'
                type="text"
                placeholder="Doe"
                value={rowData.Task}
                keyfilter={/^[A-Za-z ]+$/}
                maxLength={30}
                onChange={(e) => handleInputChangeItem(e, props.rowIndex)}
            />
        </div>
    </> :
        <>
            <div className="">
                <InputText
                    id={`Task${props.rowIndex}`}
                    name='Task'
                    type="text"
                    placeholder="Doe"
                    value={rowData.Task}
                    keyfilter={/^[A-Za-z ]+$/}
                    maxLength={30}
                    onChange={(e) => handleInputChangeItem(e, props.rowIndex)}
                    disabled={true}
                />
            </div>
        </>}</>)
};

const projectBody = (rowData, props) => {
    return (<> {rowData.IsItemEdit ? <>
        <div className="">
            <InputText
                id={`Project${props.rowIndex}`}
                type="text"
                name='Project'
                placeholder="+91 - 00000000000"
                value={rowData.Project}
                onChange={(e) => handleInputChangeItem(e, props.rowIndex)}
                keyfilter={'num'}
                maxLength={10}
            />
        </div>
    </> :
        <>
            <div className="">
                <InputText
                    id={`Project${props.rowIndex}`}
                    type="text"
                    name='Project'
                    placeholder="Doe"
                    value={rowData.Project}
                    onChange={(e) => handleInputChangeItem(e, props.rowIndex)}
                    disabled={true}
                    keyfilter={'num'}
                    maxLength={10}
                />
            </div>
        </>}</>)
};

const assigneeBody = (rowData, props) => {
    return (<div className='p-d-flex'> {rowData.IsItemEdit ? <>
        <div className="">
            <Dropdown
                id={`Assignee${props.rowIndex}`}
                // className="p-w-100 p-mt-2"
                options={assigneeList}
                name='Assignee'
                placeholder="Select Assignee"
                value={rowData.Assignee}
                filter
                showFilterClear
                showClear
                onChange={(e) => handleInputChangeItem(e, props.rowIndex)}
                optionLabel="label"
                optionValue="value"
            />
        </div>
    </> :
        <>
            <div className="">
                <Dropdown
                    id={`Assignee${props.rowIndex}`}
                    // className="p-w-100 p-mt-2"
                    options={assigneeList}
                    name='Assignee'
                    placeholder="Select Assignee"
                    value={rowData.Assignee}
                    filter
                    showFilterClear
                    showClear
                    onChange={(e) => handleInputChangeItem(e, props.rowIndex)}
                    optionLabel="label"
                    optionValue="value"
                    disabled={true}
                />
            </div>
        </>}<Button className='p-custom-btn p-ml-2' onClick={(e) => handleOpen(e, 'showDesignationMaster')} tooltip={"Add Designation"} tooltipOptions={{ className: 'bluegray-tooltip', position: 'top' }}>
                      <i className='icon-add'></i>
                    </Button></div>)
};

const taskStatusBody = (rowData, props) => {
    return (<> {rowData.IsItemEdit ? <>
        <div className="">
            <InputText
                id={`TaskStatus${props.rowIndex}`}
                type="email"
                name='TaskStatus'
                placeholder="Task status"
                value={rowData.TaskStatus}
                onChange={(e) => handleInputChangeItem(e, props.rowIndex)}
                keyfilter={'email'}
            // maxLength={50}
            />
        </div>
    </> :
        <>
            <div className="">
                <InputText
                    id={`TaskStatus${props.rowIndex}`}
                    type="email"
                    name='TaskStatus'
                    placeholder="Task status"
                    value={rowData.TaskStatus}
                    onChange={(e) => handleInputChangeItem(e, props.rowIndex)}
                    disabled={true}
                    keyfilter={'email'}
                // maxLength={50}
                />
            </div>
        </>}</>)
};

const deleteCareOffPerson = (ID) => {
    let List = multipleTask;
    let multipleTaskItem = List.splice(ID, 1);
    setMultipleTask([...List]);
};

const IsEditCareOffPerson = (e, idx) => {
    let tempList = multipleTask;
    tempList[idx]["IsItemEdit"] = true;
    setMultipleTask([...tempList]);
};

const AddEditCareOffPerson = (idx) => {
    if (multipleTask[idx].Task !== '' && multipleTask[idx].Project !== '' && multipleTask[idx].Assignee !== '' && multipleTask[idx].TaskStatus !== '') {
        let tempList = multipleTask;

        let isEdit = multipleTask[idx].IsItemEdit;
        let isNew = multipleTask[idx].IsItemNew;
        if (isNew && isEdit) {
            tempList[idx]["IsItemNew"] = false;
            tempList[idx]["IsItemEdit"] = false;

            let newArray = [...tempList.map(x => { return { ...x } }), { Task: '', Project: '', Assignee: '', TaskStatus: '', IsItemEdit: true, IsItemNew: true }];
            setMultipleTask([...newArray]);

        } else {
            let tempList = multipleTask;
            tempList[idx]["IsItemEdit"] = false;
            setMultipleTask([...tempList]);
        }
    } else {
        Toast.error({ message: 'Please fill all the fields' });
        alert("Please fill all the fields");
    }
}

  return (
    <div className="user-container">
      <div className="card-header">
        <div className="card-title p-d-lg-flex p-ai-center p-w-100">
          <h3 className="p-mb-3 p-mb-lg-0">View Task</h3>
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
              onClick={(e) => handleOpen(e, "AddTask")}
            >
              <i className="icon-add p-mr-2"></i>Add Task
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
          value={taskList}
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

          <Column header="Action" body={actionBodyTemplate}></Column>
        </DataTable>
      </div>

      {/* Add Confirm Modal */}
      <Dialog
        header={taskId ? "Edit Task" : "Add Task"}
        visible={isAddTaskModal}
        className="dialog-popup"
        onHide={(e) => handleClose("AddTask")}
        draggable={false}
        closable={false}
        position="top"
        style={{ width: "100%" }}
      >
        <div>
          <div className="card-body">
            <div className="form-area">
              <div className={"p-grid"}>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label htmlFor="name">
                        Employee name <span style={{ color: "red" }}> *</span>:{" "}
                      </label>
                      <InputText
                        className="p-w-100 p-mt-2"
                        id="employeeName"
                        type="text"
                        placeholder="Name"
                        value={employeeName}
                        autoFocus={true}
                        onChange={(e) => handleChange(e, "employeeName")}
                        maxLength={30}
                      />
                    </div>
                  </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {employeeNameErr ? employeeNameErrText : null}
                    </span>
                </div>

                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100">
                    <div className="custom-inputs">
                      <label htmlFor="observer">Observer name<span style={{ color: "red" }}>*</span>:{" "}</label>
                      <Dropdown
                        className="p-w-100 p-mt-2"
                        inputId="observer"
                        showClear
                        placeholder="Observer name"
                        value={observer}
                        onChange={(e) => handleChange(e, "observer")}
                        options={observerList}
                        optionLabel="label"
                        filter
                      />
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {observerErr ? observerErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <span className="assigndate-field custom-inputs p-input-icon-right">
                        <label htmlFor="assignDate">
                          Assign Date <span style={{ color: "red" }}>*</span>:{" "}
                        </label>
                        <Calendar
                          className="p-w-100 p-mt-0"
                          id="assignDate"
                          type="date"
                          placeholder="dd/mm/yyyy"
                          value={assignDate}
                          onChange={(e) => handleChange(e, "assignDate")}
                          dateFormat="dd/mm/yy"
                          // showIcon
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
                      {assignDateErr ? assignDateErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <span className="dueDate-field custom-inputs p-input-icon-right">
                        <label htmlFor="dueDate">
                          Due Date <span style={{ color: "red" }}>*</span>:{" "}
                        </label>
                        <Calendar
                          className="p-w-100 p-mt-0"
                          id="dueDate"
                          type="date"
                          placeholder="dd/mm/yyyy"
                          value={dueDate}
                          onChange={(e) => handleChange(e, "dueDate")}
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
                      {dueDateErr ? dueDateErrText : null}
                    </span>
                  </div>
                </div>

                
                <div className="p-col-12 p-md-12 p-pl-lg-0 p-pr-lg-12">
                                <div className="p-w-100 ">
                                    <DataTable dataKey="id" className='main-table table-td' value={multipleTask} editMode="row" >
                                        <Column header="Sr. No." body={srNoBody} style={{ width: '10%' }}></Column>
                                        <Column header="Name" body={taskBody} style={{ width: '40%' }}></Column>
                                        <Column header="Mobile Number" body={projectBody} style={{ width: '40%' }}></Column>
                                        <Column header="Designation" body={assigneeBody} style={{ width: '40%' }}></Column>
                                        <Column header="Email Id" body={taskStatusBody} style={{ width: '40%' }}></Column>
                                        <Column header="Action" body={actionBody} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                                    </DataTable>
                                </div>
                            </div>
                            
              </div>
              <hr />
              <div className="dialog-footer">
                <Button
                  className="btn-dialog-submit"
                  severity="secondary"
                  raised
                  onClick={(e) => AddUpdateTask(e)}
                  style={{ height: "35px" }}
                >
                  Save
                </Button>
                <Button
                  className="btn-dialog-cancel"
                  onClick={(e) => handleClose("AddTask")}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Delete Confirm Modal */}
      <Dialog
        header="Delete Task"
        visible={isDeleteTaskModal}
        className="dialog-popup"
        onHide={(e) => handleClose("DeleteTask")}
        draggable={false}
        closable={false}
        position="top"
      >
        <span>Are you sure want to delete the task ?</span>
        <div className="dialog-footer">
          <button
            className="btn-dialog-cancel"
            onClick={(e) => handleClose("DeleteTask")}
          >
            Cancel
          </button>
          <button className="btn-dialog-delete" onClick={() => DeleteTask()}>
            Delete
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default Task;
