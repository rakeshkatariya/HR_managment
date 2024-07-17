import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import api from "../../utils/apiClient";
import CommonConfig from '../../utils/constant';
import APIConstant from '../../utils/PathConstants';
import { FileUpload } from 'primereact/fileupload';
import Toast from '../Shared/Toast/Toast';
import Loader from '../Shared/Loader/Loader';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useHistory } from 'react-router-dom';

// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.css';

const Users = (props) => {
    const [personId, setPersonId] = useState(null);
    const [securityUserID, setSecurityUserID] = useState(null);

    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState(false);
    const [nameErrText, setNameErrText] = useState('');

    const [birthDate, setBirthDate] = useState('');
    const [birthDateErr, setBirthDateErr] = useState(false);
    const [birthDateErrText, setBirthDateErrText] = useState('');

    const [mobileNo, setMobileNo] = useState('');
    const [mobileNoErr, setMobileNoErr] = useState(false);
    const [mobileNoErrText, setMobileNoErrText] = useState('');

    const [occupation, setOccupation] = useState('');
    const [occupationErr, setOccupationErr] = useState(false);
    const [occupationErrText, setOccupationErrText] = useState('');

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [emailErrText, setEmailErrText] = useState('');

    const [address, setAddress] = useState('');
    const [addressErr, setAddressErr] = useState(false);
    const [addressErrText, setAddressErrText] = useState('');

    const [photo, setPhoto] = useState('');
    const [photoErr, setPhotoErr] = useState(false);
    const [photoErrText, setPhotoErrText] = useState('');


    const [globalFilter, setGlobalFilter] = useState('');
  const [personList, setPersonList] = useState([]);
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
        setPersonId(null);
        setAddUserModal(false);

        setName('');
        setNameErr(false);
        setNameErrText('');

        setBirthDate('');
        setBirthDateErr(false);
        setBirthDateErrText('');

        setMobileNo('');
        setMobileNoErr(false);
        setMobileNoErrText('');

        setOccupation('');
        setOccupationErr(false);
        setOccupationErrText('');

        setEmail('');
        setEmailErr(false);
        setEmailErrText('');

        setAddress('');
        setAddressErr(false);
        setAddressErrText('');

        setPhoto('');
        setPhotoErr(false);
        setPhotoErrText('');

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
        if (type === 'birthDate') {
            if (CommonConfig.isEmpty(e.target.value)) {
                setBirthDate("");
                setBirthDateErr(true);
                setBirthDateErrText("Birth date is required")
            } else {
                setBirthDate(e.target.value);
                setBirthDateErr(false);
                setBirthDateErrText("");
            }
        }
        if (type === 'mobileNo') {
            if (CommonConfig.isEmpty(e.target.value)) {
                setMobileNo("");
                setMobileNoErr(true);
                setMobileNoErrText("Mobile number is required")
            } else {
                setMobileNo(e.target.value);
                setMobileNoErr(false);
                setMobileNoErrText("");
            }
        }
        if (type === 'occupation') {
            if (CommonConfig.isEmpty(e.target.value)) {
                setOccupation("");
                setOccupationErr(true);
                setOccupationErrText("Birth date is required")
            } else {
                setOccupation(e.target.value);
                setOccupationErr(false);
                setOccupationErrText("");
            }
        }
        if (type === 'email') {
            if (CommonConfig.isEmpty(e.target.value)) {
                setEmail("");
                setEmailErr(true);
                setEmailErrText("Email Id is required")
            } else {
                setEmail(e.target.value);
                setEmailErr(false);
                setEmailErrText("");
            }
        }
        if (type === 'address') {
            if (CommonConfig.isEmpty(e.target.value)) {
                setAddress("");
                setAddressErr(true);
                setAddressErrText("Address is required")
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
        if (type === 'AddUsers') {
            setAddUserModal(true);
            // history.push('/addUser');
        } else if (type === 'DeletePerson') {
            setPersonId(item.value);
            setIsDeletePersonMod(true);
        }
    };

    const handleClose = async (type) => {
        if (type === 'AddUsers') {
            setAddUserModal(false);
        } else if (type === 'DeletePerson') {
            setPersonId(null);
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
        if (CommonConfig.isEmpty(email)) {
            setEmailErr(true);
            setEmailErrText("Email ID is required");
            IsformValid = false;
        } else {
            setEmailErr(false);
            setEmailErrText("");
        }
        if (CommonConfig.isEmpty(birthDate)) {
            setBirthDateErr(true);
            setBirthDateErrText("Birth date is required");
            IsformValid = false;
        } else {
            setBirthDateErr(false);
            setBirthDateErrText("");
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
            //   formData.append('Data', JSON.stringify(data));
            //   formData.append('PolicyOneDocument', policyOneDocument.length ? policyOneDocument[0]?.file : []);
            //   formData.append('PolicyTwoDocument', policyTwoDocument.length ? policyTwoDocument[0]?.file : []);
            //   formData.append('EndorsementDocument', endorsement.length ? endorsement[0]?.file : []);
            //   formData.append('OtherDocument', otherDocument.length ? otherDocument[0]?.file : []);

            //   console.log("formData", JSON.stringify(data));
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
                ID: personId,
                UserID: securityUserID,
            };
            await api
                .post(APIConstant.path.DeleteMasterByType, data).then(async (res) => {
                    if (res.success) {
                        handleClose('DeletePerson');
                        // getPerson();
                        setPersonId();
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
                    setPersonList(res.data);
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
                    <h3 className="p-mb-3 p-mb-lg-0">View person</h3>
                    <div className="p-ml-auto p-d-lg-flex p-ai-center">
                        <span className="searchbar-area">
                            <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" size="30" />
                            <i className="icon-search"></i>
                        </span>
                    </div>
                    {/* <div className='card-actions p-ml-2'>
                        <Button type="button" className='add-btn add-btn p-button p-component p-jc-center p-w-100' onClick={(e) => handleOpen(e,'AddUsers')}>
                            <i className="icon-add"></i>Add person
                        </Button>
                    </div> */}
                    <div className='card-actions p-ml-2'>
                        <Button type="button" className='add-btn add-btn p-button p-component p-jc-center p-w-100' onClick={(e) => handleOpen(e,'AddUsers')}>
                            <i className="icon-add"></i>Add person
                        </Button>
                    </div>
                </div>
            </div>
            <div className="card">
                <DataTable globalFilter={globalFilter} paginator paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[5, 10, 25, 50]} className='custom-table'value={personList} scrollable scrollHeight="calc(100vh - 203px)">
                    <Column field="Index" header="Sr.No" body={actionBodyTemplateSrNo} style={{ maxWidth: 150 }}></Column>
                    <Column field="PersonName" header="Person name" style={{ width: "25%" }} ></Column>
                    <Column field="MobileNo" header="Mobile No" style={{ width: "25%" }} ></Column>
                    <Column field="Email" header="Email ID" style={{ width: "25%" }} ></Column>
                    <Column field="BirthDate" header="Birth date" style={{ width: "25%" }} ></Column>
                    <Column field="Address" header="Address" style={{ width: "25%" }} ></Column>
                    <Column field="Occupation" header="Occupation" style={{ width: "25%" }} ></Column>
                    <Column field="ProfilePhoto" header="Profile photo" style={{ width: "25%" }} ></Column>
                    <Column header="Action" body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            {/* Add Confirm Modal */}
            <Dialog
                header={personId ? "Edit Users" : "Add Users"}
                visible={addUserModal}
                className='dialog-popup'
                onHide={(e) => handleClose('AddUsers')}
                draggable={false}
                closable={false}
                position="top"
                style={{ width: '1000px', height: '500px' }}
            >
                <div>
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
                                            <label htmlFor="mobileNo">Mobile number <span style={{ color: 'red' }}>*</span>: </label>
                                            <InputText
                                                className="p-w-100 p-mt-2"
                                                id="mobileNo"
                                                type="text"
                                                placeholder="Mobile number"
                                                value={mobileNo}
                                                autoFocus={true}
                                                onChange={(e) => handleChange(e, "mobileNo")}
                                                maxLength={10}
                                                keyfilter={'num'}
                                            />
                                        </div>
                                        <span className="error-msg" style={{ color: 'red' }}>
                                            {mobileNoErr ? mobileNoErrText : null}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-col-12 p-md-4 p-pt-2">
                                    <div className="p-w-100 ">
                                        <div className="custom-inputs">
                                            <label htmlFor="email">Email ID <span style={{ color: 'red' }}>*</span>: </label>
                                            <InputText
                                                className="p-w-100 p-mt-2"
                                                id="email"
                                                type="text"
                                                placeholder="Example123@example.com"
                                                value={email}
                                                autoFocus={true}
                                                onChange={(e) => handleChange(e, "email")}
                                                keyfilter={'email'}
                                            />
                                        </div>
                                        <span className="error-msg" style={{ color: 'red' }}>
                                            {emailErr ? emailErrText : null}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-col-12 p-md-4 p-pt-2">
                                    <div className="p-w-100 ">
                                        <div className="custom-inputs">
                                            <label htmlFor="birthDate">Birth Date <span style={{ color: 'red' }}>*</span>: </label>
                                            <Calendar
                                                className="p-w-100 p-mt-2"
                                                id="birthDate"
                                                type="date"
                                                placeholder="dd/mm/yyyy"
                                                value={birthDate}
                                                onChange={(e) => handleChange(e, "birthDate")}
                                                dateFormat="dd/mm/yy"
                                                showIcon
                                            />
                                        </div>
                                        <span className="error-msg" style={{ color: 'red' }}>
                                            {birthDateErr ? birthDateErrText : null}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-col-12 p-md-4 p-pt-2">
                                    <div className="p-w-100 ">
                                        <div className="custom-inputs">
                                            <label htmlFor="occupation">Occupation <span style={{ color: 'red' }}>*</span>: </label>
                                            <InputText
                                                className="p-w-100 p-mt-2"
                                                id="occupation"
                                                type="text"
                                                placeholder="Occupation"
                                                value={occupation}
                                                autoFocus={true}
                                                onChange={(e) => handleChange(e, "occupation")}
                                                // maxLength={30}
                                            />
                                        </div>
                                        <span className="error-msg" style={{ color: 'red' }}>
                                            {occupationErr ? occupationErrText : null}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-col-12 p-md-4 p-pt-2">
                                    <div className="p-w-100 ">
                                        <div className="custom-inputs">
                                            <label htmlFor="address">Address <span style={{ color: 'red' }}>*</span>: </label>
                                            <InputText
                                                className="p-w-100 p-mt-2"
                                                id="address"
                                                type="text"
                                                placeholder="Address"
                                                value={address}
                                                autoFocus={true}
                                                onChange={(e) => handleChange(e, "address")}
                                                // maxLength={30}
                                            />
                                        </div>
                                        <span className="error-msg" style={{ color: 'red' }}>
                                            {addressErr ? addressErrText : null}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-col-12 p-md-4 p-pt-2">
                                    <div className="p-w-100 ">
                                        <div className="custom-inputs">
                                            <label htmlFor="userType">Profile Photo </label>
                                            <FileUpload
                                                files={photo}
                                                allowMultiple={false}
                                                acceptedFileTypes={['application/pdf', 'image/*']}
                                                maxFileSize="5MB"
                                                name="files"
                                                labelIdle={'Images/PDF (max size 5MB) <span class="block filepond--label-action">Browse</span>'}
                                                onupdatefiles={setPhoto}
                                                maxFiles={1}
                                            />
                                        </div>
                                        <span className="error-msg" style={{ color: 'red' }}>
                                            {photoErr ? photoErrText : null}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className='dialog-footer'>
                                    <Button label="Submit" severity="secondary" raised onClick={(e) => AddUpdatePerson(e)} />
                                    <button className='btn-dialog-cancel' onClick={(e) => handleClose('AddUsers')}> cancel </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </Dialog>

            {/* Delete Confirm Modal */}
            <Dialog
                header="Delete  Berth/Jetty"
                visible={isDeletePersonModal}
                className='dialog-popup'
                onHide={(e) => handleClose('DeletePerson')}
                draggable={false}
                closable={false}
                position="top"
            >
                <span>Are you sure want to delete the person ?</span>
                <div className='dialog-footer'>
                    <button className='btn-dialog-cancel' onClick={(e) => handleClose('DeletePerson')}> Cancel </button>
                    <button className='btn-dialog-delete' onClick={() => DeletePerson()} > Delete </button>
                </div>
            </Dialog>
        </div>
    )
}

export default Users