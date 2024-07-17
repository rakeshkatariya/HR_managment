import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import api from "../../utils/apiClient";
import CommonConfig from '../../utils/constant';
import APIConstant from '../../utils/PathConstants';
import { Dropdown } from "primereact/dropdown";
import Toast from '../Shared/Toast/Toast';
import Loader from '../Shared/Loader/Loader';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useHistory } from 'react-router-dom';

const Rent = () => {
  const [rentId, setRentId] = useState(null);
  const [securityUserID, setSecurityUserID] = useState(null);

  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [nameErrText, setNameErrText] = useState('');

  const [amount, setAmount] = useState('');
  const [amountErr, setAmountErr] = useState(false);
  const [amountErrText, setAmountErrText] = useState('');

  const [date, setDate] = useState('');
  const [dateErr, setDateErr] = useState(false);
  const [dateErrText, setDateErrText] = useState('');

  const [description, setDescription] = useState('');
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [descriptionErrText, setDescriptionErrText] = useState('');

  const [day, setDay] = useState('');
  const [dayErr, setDayErr] = useState(false);
  const [dayErrText, setDayErrText] = useState('');
  // const [dayList, setDayList] = useState([]);
  const dayList = [
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
    { label: 'Sunday', value: 'Sunday' },
  ];


  const [globalFilter, setGlobalFilter] = useState('');
  const [rentList, setRentList] = useState([]);
  const [addUserModal, setAddUserModal] = useState(false);
  const [isDeletePersonModal, setIsDeletePersonMod] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const loginData = CommonConfig.loginData();
    // setSecurityUserID(loginData?.UserId);
    getPersonList();
  }, []);


  const resetScreen = async () => {
    // setSecurityUserID(null);
    setRentId(null);
    setAddUserModal(false);

    setName('');
    setNameErr(false);
    setNameErrText('');

    setAmount('');
    setAmountErr(false);
    setAmountErrText('');

    setDate('');
    setDateErr(false);
    setDateErrText('');

    setDescription('');
    setDescriptionErr(false);
    setDescriptionErrText('');

    setDay('');
    setDayErr(false);
    setDayErrText('');

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
    if (type === 'date') {
      if (CommonConfig.isEmpty(e.target.value)) {
        setDate("");
        setDateErr(true);
        setDateErrText("Birth date is required")
      } else {
        setDate(e.target.value);
        setDateErr(false);
        setDateErrText("");
      }
    }
    if (type === 'amount') {
      if (CommonConfig.isEmpty(e.target.value)) {
        setAmount("");
        setAmountErr(true);
        setAmountErrText("Amount is required")
      } else {
        setAmount(e.target.value);
        setAmountErr(false);
        setAmountErrText("");
      }
    }
    if (type === 'day') {
      if (CommonConfig.isEmpty(e.target.value)) {
        setDay("");
        setDayErr(true);
        setDayErrText("Day is required")
      } else {
        setDay(e.target.value);
        setDayErr(false);
        setDayErrText("");
      }
    }
    if (type === 'description') {
      if (CommonConfig.isEmpty(e.target.value)) {
        setDescription("");
        setDescriptionErr(true);
        setDescriptionErrText("Address is required")
      } else {
        setDescription(e.target.value);
        setDescriptionErr(false);
        setDescriptionErrText("");
      }
    }
  };

  const handleOpen = async (item, type) => {
    if (type === 'AddUsers') {
      setAddUserModal(true);
      // history.push('/addUser');
    } else if (type === 'DeletePerson') {
      setRentId(item.value);
      setIsDeletePersonMod(true);
    }
  };

  const handleClose = async (type) => {
    if (type === 'AddUsers') {
      setAddUserModal(false);
      resetScreen();
    } else if (type === 'DeletePerson') {
      setRentId(null);
      setIsDeletePersonMod(false);
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
    if (CommonConfig.isEmpty(amount)) {
      setAmountErr(true);
      setAmountErrText("Amount is required");
      IsformValid = false;
    } else {
      setAmountErr(false);
      setAmountErrText("");
    }
    if (CommonConfig.isEmpty(day)) {
      setDayErr(true);
      setDayErrText("Day is required");
      IsformValid = false;
    } else {
      setDayErr(false);
      setDayErrText("");
    }

    if (CommonConfig.isEmpty(date)) {
      setDateErr(true);
      setDateErrText("Birth date is required");
      IsformValid = false;
    } else {
      setDateErr(false);
      setDateErrText("");
    }
    if (CommonConfig.isEmpty(description)) {
      setDescriptionErr(true);
      setDescriptionErrText("Address is required");
      IsformValid = false;
    } else {
      setDescriptionErr(false);
      setDescriptionErrText("");
    }

    return IsformValid;
  }

  const AddUpdatePerson = async (e) => {
    e.preventDefault();
    if (validation()) {
      Loader.show();
      var formData = new FormData();
      let data = {
        // SecurityUserID: securityUserID,
        Name: name,
        Status: 'Active'
      }
      try {
        api.post(APIConstant.path.AddUpdatePolicy, formData, {
          headers: {
            'Content-Type': 'mulitipart/form-data'
          }
        }).then((res) => {
          const response = res.data
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
          })
      } catch (err) {
        Toast.error({ message: err });
        Loader.hide();
      }
    }
  }

  const DeletePerson = async () => {
    try {
      Loader.show();
      let data = {
        ID: rentId,
        UserID: securityUserID,
      };
      await api
        .post(APIConstant.path.DeleteMasterByType, data).then(async (res) => {
          if (res.success) {
            handleClose('DeletePerson');
            // getPerson();
            setRentId();
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
  }

  const getPersonList = async (ID) => {
    try {
      let data = {

      }
      await api.post(APIConstant.path.GetStringMap, data).then(async response => {
        let res = response;
        if (res.success) {
          setRentList(res.data);
          Loader.hide();
        }
      }).catch(err => {
        Loader.hide();
        console.log(err);
      });
    } catch (err) { console.log(err); }
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className='table-icon'>
        <Button className='' onClick={() => handleOpen(rowData, 'EditCargoType')} tooltip={"Edit"} tooltipOptions={{ className: 'bluegray-tooltip', position: 'top' }}>
          <i className='icon-edit'></i>
        </Button>
        <Button className='' onClick={() => handleOpen(rowData, "DeletePerson")} tooltip={"Delete"} tooltipOptions={{ className: 'bluegray-tooltip', position: 'top' }}>
          <i className='icon-delete'  ></i>
        </Button>
        <Button className='' onClick={() => handleOpen(rowData, "DeletePerson")} tooltip={"view"} tooltipOptions={{ className: 'bluegray-tooltip', position: 'top' }}>
          <i className='icon-view'  ></i>
        </Button>
      </div>
    )
  }



  return (
    <div className='user-container'>
      <div className='card-header'>
        <div className='card-title p-d-lg-flex p-ai-center p-w-100'>
          <h3 className="p-mb-3 p-mb-lg-0">View Rent Details</h3>
          <div className="p-ml-auto p-d-lg-flex p-ai-center">
            <span className="searchbar-area">
              <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" size="30" />
              <i className="icon-search"></i>
            </span>
          </div>
          <div className='card-actions p-ml-2'>
            <Button type="button" className='add-btn add-btn p-button p-component p-jc-center p-w-100' onClick={(e) => handleOpen(e, 'AddUsers')}>
              <i className="icon-add"></i>Add Rent
            </Button>
          </div>
        </div>
      </div>
      <div className="card">
        <DataTable globalFilter={globalFilter} paginator paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[5, 10, 25, 50]} className='custom-table' value={rentList} scrollable scrollHeight="calc(100vh - 203px)">
          <Column field="Index" header="Sr.No" body={actionBodyTemplateSrNo} style={{ maxWidth: 150 }}></Column>
          <Column field="PersonName" header="Person name" style={{ width: "25%" }} ></Column>
          <Column field="Date" header="Date" style={{ width: "25%" }} ></Column>
          <Column field="Day" header="Day" style={{ width: "25%" }} ></Column>
          <Column field="Amount" header="Amount" style={{ width: "25%" }} ></Column>
          <Column field="Description" header="Description" style={{ width: "25%" }} ></Column>
          <Column header="Action" body={actionBodyTemplate}></Column>
        </DataTable>
      </div>

      {/* Add Confirm Modal */}
      <Dialog
        header={rentId ? "Edit Rent" : "Add Rent"}
        visible={addUserModal}
        className='dialog-popup'
        onHide={(e) => handleClose('AddUsers')}
        draggable={false}
        closable={false}
        position="top"
        style={{ width: '1000px', height: '500px' }}
      >

        <div className='card-body'>
          <div className="form-area">
            <div className={"p-grid"}>

              <div className="p-col-12 p-md-4 p-pt-2">
                <div className="p-w-100 ">
                  <div className="custom-inputs">
                    <label htmlFor="name">Person name <span style={{ color: 'red' }}>*</span>: </label>
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
                  <span className="error-msg" style={{ color: 'red' }}>
                    {nameErr ? nameErrText : null}
                  </span>
                </div>
              </div>

              <div className="p-col-12 p-md-4 p-pt-2">
                <div className="p-w-100 ">
                  <div className="custom-inputs">
                    <label htmlFor="amount">Amount <span style={{ color: 'red' }}>*</span>: </label>
                    <InputText
                      className="p-w-100 p-mt-2"
                      id="amount"
                      type="text"
                      placeholder="Amount"
                      value={amount}
                      autoFocus={true}
                      onChange={(e) => handleChange(e, "amount")}
                      maxLength={10}
                      keyfilter={'num'}
                    />
                  </div>
                  <span className="error-msg" style={{ color: 'red' }}>
                    {amountErr ? amountErrText : null}
                  </span>
                </div>
              </div>

              <div className="p-col-12 p-md-4 p-pt-2">
                <div className="p-w-100 ">
                  <div className="custom-inputs">
                    <label htmlFor="date">Date <span style={{ color: 'red' }}>*</span>: </label>
                    <Calendar
                      className="p-w-100 p-mt-2"
                      id="date"
                      type="date"
                      placeholder="dd/mm/yyyy"
                      value={date}
                      onChange={(e) => handleChange(e, "date")}
                      dateFormat="dd/mm/yy"
                      showIcon
                    />
                  </div>
                  <span className="error-msg" style={{ color: 'red' }}>
                    {dateErr ? dateErrText : null}
                  </span>
                </div>
              </div>

              <div className="p-col-12 p-md-4 p-pt-2">
                <div className="p-w-100 ">
                  <div className="custom-inputs">
                    <label htmlFor="day">Day</label>
                    <Dropdown
                      className="p-w-100 p-mt-2"
                      inputId="day"
                      placeholder="Day"
                      value={day}
                      onChange={(e) => handleChange(e, 'day')}
                      options={dayList}
                      optionLabel="label"
                      filter
                    />
                  </div>
                  <span className="error-msg" style={{ color: 'red' }}>
                    {dayErr ? dayErrText : null}
                  </span>
                </div>
              </div>

              <div className="p-col-12 p-md-4 p-pt-2">
                <div className="p-w-100 ">
                  <div className="custom-inputs">
                    <label htmlFor="description">Description <span style={{ color: 'red' }}>*</span>: </label>
                    <InputText
                      className="p-w-100 p-mt-2"
                      id="description"
                      type="text"
                      placeholder="Description"
                      value={description}
                      autoFocus={true}
                      onChange={(e) => handleChange(e, "description")}
                    // maxLength={30}
                    />
                  </div>
                  <span className="error-msg" style={{ color: 'red' }}>
                    {descriptionErr ? descriptionErrText : null}
                  </span>
                </div>
              </div>
            </div>
            <div className='dialog-footer'>
              <Button label="Submit" severity="secondary" raised onClick={(e) => AddUpdatePerson(e)} />
              <Button className='btn-dialog-cancel' onClick={(e) => handleClose('AddUsers')}> cancel </Button>
            </div>
          </div>
        </div>
      </Dialog >

      {/* Delete Confirm Modal */}
      <Dialog
        header="Delete  Berth/Jetty"
        visible={isDeletePersonModal}
        className='dialog-popup'j
        onHide={(e) => handleClose('DeletePerson')}
        draggable={false}
        closable={false}
        position="top"
      >
        <span>Are you sure want to delete the person rent ?</span>
        <div className='dialog-footer'>
          <button className='btn-dialog-cancel' onClick={(e) => handleClose('DeletePerson')}> Cancel </button>
          <button className='btn-dialog-delete' onClick={() => DeletePerson()} > Delete </button>
        </div>
      </Dialog >
    </div >
  )
}

export default Rent