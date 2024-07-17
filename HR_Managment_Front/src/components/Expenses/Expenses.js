/* eslint-disable react-hooks/exhaustive-deps */
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
import { Dropdown } from "primereact/dropdown";

// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.css';

const Expenses = (props) => {
  const loginData = CommonConfig.loginData();
  const [expensesId, setExpensesId] = useState('');
  const [securityUserID, setSecurityUserID] = useState(loginData?.UserId);

  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [nameErrText, setNameErrText] = useState("");
  const [userList, setUserList] = useState([]);

  const [amount, setAmount] = useState("");
  const [amountErr, setAmountErr] = useState(false);
  const [amountErrText, setAmountErrText] = useState("");

  const [date, setDate] = useState("");
  const [dateErr, setDateErr] = useState(false);
  const [dateErrText, setDateErrText] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [descriptionErrText, setDescriptionErrText] = useState("");

  const [globalFilter, setGlobalFilter] = useState("");
  const [filteredExpensesList, setFilteredExpensesList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [showExpensesList, setShowExpensesList] = useState(true);
  const [addExpensesModal, setAddExpensesModal] = useState(false);
  const [isDeleteExpensesModal, setIsDeleteExpensesModal] = useState(false);

  useEffect(() => {
    const loginData = CommonConfig.loginData();
    setSecurityUserID(loginData?.SecurityUserID);
    getUserList();
    getExpensesList();
  }, []);

  useEffect(() => {
    const filteredList = expensesList.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(globalFilter.toLowerCase())
      )
    );
    setFilteredExpensesList(filteredList);
  }, [globalFilter, expensesList]);

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
    setExpensesId(null);
    setAddExpensesModal(false);

    setName("");
    setNameErr(false);
    setNameErrText("");

    setAmount("");
    setAmountErr(false);
    setAmountErrText("");

    setDate("");
    setDateErr(false);
    setDateErrText("");

    setDescription("");
    setDescriptionErr(false);
    setDescriptionErrText("");
  };

  const handleChange = (e, type) => {
    if (type === "name") {
      if (CommonConfig.isEmpty(e.value)) {
        setName("");
        setNameErr(true);
        setNameErrText("Name is required");
      } else {
        setName(e.value);
        setNameErr(false);
        setNameErrText("");
      }
    }
    if (type === "amount") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setAmount("");
        setAmountErr(true);
        setAmountErrText("Amount is required");
      } else {
        setAmount(e.target.value);
        setAmountErr(false);
        setAmountErrText("");
      }
    }
    if (type === "date") {
      if (CommonConfig.isEmpty(e.value)) {
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
        setDescriptionErrText("Email Id is required");
      } else {
        setDescription(e.target.value);
        setDescriptionErr(false);
        setDescriptionErrText("");
      }
    }
  };

  const handleOpen = async (item, type) => {
    if (type === "AddExpenses") {
      setAddExpensesModal(true);
    } else if (type === "EditExpenses") {
      setExpensesId(item.ExpensesMasterID);
      setName(parseInt(item.EmployeeName));
      setAmount(item.Amount);
      const parts = item.Date.split("-");
      setDate(new Date(`${parts[2]}-${parts[1]}-${parts[0]}`));
      setDescription(item.Description);
      setAddExpensesModal(true);
    } else if (type === "DeleteExpenses") {
      setExpensesId(item.ExpensesMasterID);
      setIsDeleteExpensesModal(true);
    }
  };

  const handleClose = async (type) => {
    if (type === "AddExpenses") {
      setAddExpensesModal(false);
      resetScreen();
    } else if (type === "DeleteExpenses") {
      setExpensesId(null);
      setIsDeleteExpensesModal(false);
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
    if (CommonConfig.isEmpty(description)) {
      setDescriptionErr(true);
      setDescriptionErrText("Description is required");
      IsformValid = false;
    } else {
      setDescriptionErr(false);
      setDescriptionErrText("");
    }
    if (CommonConfig.isEmpty(amount)) {
      setAmountErr(true);
      setAmountErrText("Amount is required");
      IsformValid = false;
    } else {
      setAmountErr(false);
      setAmountErrText("");
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

  const AddUpdateExpenses = async (e) => {
    e.preventDefault();
    // if (validation()) {
    Loader.show();
    let data = {
      UserId: securityUserID,
      ExpensesId: expensesId,
      Name: name,
      Amount: amount,
      Date: date,
      Description: description,
    };
    try {
      api
        .post(APIConstant.path.AddUpdateExpenses, data)
        .then((res) => {
          if (res.success) {
            Toast.success({ message: res.message });
            Loader.hide();
            resetScreen();
            getExpensesList();
          } else {
            Toast.error({ message: res.message });
            Loader.hide();
            // getExpensesList();
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
    // }
  };

  const DeleteExpenses = async () => {
    try {
      Loader.show();
      let data = {
        ExpensesId: expensesId,
        UserId: securityUserID,
      };
      await api
        .post(APIConstant.path.DeleteExpenses, data)
        .then(async (res) => {
          if (res.success) {
            handleClose("DeleteExpenses");
            getExpensesList();
            setExpensesId();
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

  const getExpensesList = async (ID) => {
    try {
      let data = {
        UserId: CommonConfig.loginData().UserId,
      };
      await api
        .post(APIConstant.path.getExpensesDataList, data)
        .then(async (res) => {
          if (res.success) {
            setExpensesList(res.data[0]);
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
          onClick={() => handleOpen(rowData, "EditExpenses")}
          tooltip={"Edit"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-edit"></i>
        </Button>
        <Button
          className=""
          onClick={() => handleOpen(rowData, "DeleteExpenses")}
          tooltip={"Delete"}
          tooltipOptions={{ className: "bluegray-tooltip", position: "top" }}
        >
          <i className="icon-delete"></i>
        </Button>
      </div>
    );
  };

  const toggleExpensesList = () => {
    setShowExpensesList(!showExpensesList);
  };

  return (
    <div className="user-container">
      <div className="card-header">
        <div className="card-title p-d-lg-flex p-ai-center p-w-100">
          <h3 className="p-mb-3 p-mb-lg-0">View Expenses</h3>
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
              onClick={(e) => handleOpen(e, "AddExpenses")}
            >
              <i className="icon-add p-mr-2"></i>Add Expenses
            </Button>
            <Button
              className="p-button p-component p-jc-center"
              onClick={toggleExpensesList}
            >
              {!showExpensesList ? (
                <i className="icon-dashboard"></i>
              ) : (
                <i className="pi pi-list"></i>
              )}
            </Button>
          </div>
        </div>
      </div>
      {showExpensesList && (
        <div className="card">
          <DataTable
            globalFilter={globalFilter}
            paginator
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            className="custom-table"
            value={expensesList}
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
              field="EmployeeFullName"
              header="Employee name"
              style={{ width: "25%" }}
            />
            <Column field="Amount" header="Amount" style={{ width: "25%" }} />
            <Column field="Date" header="Date" style={{ width: "25%" }} />
            <Column
              field="Description"
              header="Description"
              style={{ width: "25%" }}
            />
            <Column header="Action" body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
      )}
      {!showExpensesList && (
        <div className="card-body">
          <div className="dashboard-container p-grid">
            {filteredExpensesList.map((item, index) => (
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
                        Name: {item.EmployeeFullName}
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
                            onClick={() =>  handleOpen(item, "EditExpenses")}
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
                            onClick={() => handleOpen(item, "DeleteExpenses")}
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
                    <div className="">Date: {item.Date}</div>
                    <div className=""> Amount {item.Amount}</div>
                    <div
                      className=""
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="">Description: {item.Description}</div>
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
        visible={addExpensesModal}
        onHide={() => setAddExpensesModal(true)}
        position="right"
        showCloseIcon={false}
        style={{ position: "relative" }}
      >
        <div>
          <div className="card-body">
            <h3>{expensesId ? "Edit Expenses" : "Add Expenses"}</h3>
            <div className="form-area">
              <div className={"p-grid"}>
                <div className="p-col-12 p-md-12 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label htmlFor="name">
                        Employee name <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <Dropdown
                        className="p-w-100 p-mt-2"
                        inputId="name"
                        autoFocus={true}
                        // showClear
                        placeholder="Select name"
                        value={name}
                        onChange={(e) => handleChange(e, "name")}
                        options={userList}
                        optionLabel="Name"
                        optionValue="Value"
                        filter
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
                      <label htmlFor="amount">
                        Amount <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <InputText
                        className="p-w-100 p-mt-2"
                        id="amount"
                        type="text"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => handleChange(e, "amount")}
                        maxLength={10}
                        keyfilter={"num"}
                      />
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {amountErr ? amountErrText : null}
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
                      <InputText
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
                  onClick={(e) => AddUpdateExpenses(e)}
                  style={{ height: "35px" }}
                >
                  Submit
                </Button>
                <Button
                  className="btn-dialog-cancel"
                  onClick={(e) => handleClose("AddExpenses")}
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
        visible={isDeleteExpensesModal}
        className="dialog-popup"
        onHide={(e) => handleClose("DeleteExpenses")}
        draggable={false}
        closable={false}
        position="top"
      >
        <span>Are you sure want to delete the expenses ?</span>
        <div className="dialog-footer">
          <button
            className="btn-dialog-cancel"
            onClick={(e) => handleClose("DeleteExpenses")}
          >
            {" "}
            Cancel{" "}
          </button>
          <button
            className="btn-dialog-delete"
            onClick={() => DeleteExpenses()}
          >
            {" "}
            Delete{" "}
          </button>
        </div>
      </Dialog>
    </div>
  );
};
export default Expenses;
