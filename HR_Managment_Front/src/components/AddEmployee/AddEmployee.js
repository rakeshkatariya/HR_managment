import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import api from "../../utils/apiClient";
import CommonConfig from "../../utils/constant";
import APIConstant from "../../utils/PathConstants";
import Toast from "../Shared/Toast/Toast";
import Loader from "../Shared/Loader/Loader";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { RadioButton } from "primereact/radiobutton";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Checkbox } from "primereact/checkbox";
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


const AddEmployee = () => {
    const location = useLocation();
    const [employeeId, setEmployeeId] = useState(null);
    const [securityUserID, setSecurityUserID] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [firstNameErr, setFirstNameErr] = useState(false);
    const [firstNameErrText, setFirstNameErrText] = useState("");

    const [lastName, setLastName] = useState("");
    const [lastNameErr, setLastNameErr] = useState(false);
    const [lastNameErrText, setLastNameErrText] = useState("");

    const [birthDate, setBirthDate] = useState("");
    const [birthDateErr, setBirthDateErr] = useState(false);
    const [birthDateErrText, setBirthDateErrText] = useState("");

    const [mobileNo, setMobileNo] = useState("");
    const [mobileNoErr, setMobileNoErr] = useState(false);
    const [mobileNoErrText, setMobileNoErrText] = useState("");

    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState(false);
    const [emailErrText, setEmailErrText] = useState("");

    const [address, setAddress] = useState("");
    const [addressErr, setAddressErr] = useState(false);
    const [addressErrText, setAddressErrText] = useState("");

    const [isExperience, setIsExperience] = useState(false);

    const [expStartDate, setExpStartDate] = useState("");
    const [expStartDateErr, setExpStartDateErr] = useState(false);
    const [expStartDateErrText, setExpStartDateErrText] = useState("");

    const [expEndDate, setExpEndDate] = useState("");
    const [expEndDateErr, setExpEndDateErr] = useState(false);
    const [expEndDateErrText, setExpEndDateErrText] = useState("");

    const [description, setDescription] = useState("");
    const [descriptionErr, setDescriptionErr] = useState(false);
    const [descriptionErrText, setDescriptionErrText] = useState("");

    const [joiningDate, setJoiningDate] = useState("");
    const [joiningDateErr, setJoiningDateErr] = useState(false);
    const [joiningDateErrText, setJoiningDateErrText] = useState("");

    const [jobTitle, setJobTitle] = useState("");
    const [jobTitleErr, setJobTitleErr] = useState(false);
    const [jobTitleErrText, setJobTitleErrText] = useState("");

    const [manager, setManager] = useState("");
    const [managerErr, setManagerErr] = useState(false);
    const [managerErrText, setManagerErrText] = useState("");

    const [salary, setSalary] = useState("");
    const [salaryErr, setSalaryErr] = useState(false);
    const [salaryErrText, setSalaryErrText] = useState("");

    const [jobType, setJobType] = useState("");
    const [jobTypeErr, setJobTypeErr] = useState(false);
    const [jobTypeErrText, setJobTypeErrText] = useState("");

    const [workLocation, setWorkLocation] = useState("workFromOffice");

    const [emergencyContact, setEmergencyContact] = useState("");
    const [emergencyContactErr, setEmergencyContactErr] = useState(false);
    const [emergencyContactErrText, setEmergencyContactErrText] = useState("");

    const [qualification, setQualification] = useState("");
    const [qualificationErr, setQualificationErr] = useState(false);
    const [qualificationErrText, setQualificationErrText] = useState("");

    const [photo, setPhoto] = useState("");
    const [photoErr, setPhotoErr] = useState(false);
    const [photoErrText, setPhotoErrText] = useState("");

    const [aadharCard, setAadharCard] = useState("");
    const [aadharCardErr, setAadharCardErr] = useState(false);
    const [aadharCardErrText, setAadharCardErrText] = useState("");

    const history = useHistory();

    useEffect(() => {
        const loginData = CommonConfig.loginData();
        setSecurityUserID(loginData?.SecurityUserID);
        if (location?.state?.EmployeeId) {
            setEmployeeId(location?.state.EmployeeId);
            getEmployeeDataById(location?.state?.EmployeeId);
        }

    }, []);

    const getEmployeeDataById = async (Id) => {
        try {
            Loader.show();
            let data = {
                EmployeeId: Id,
            };
            api
                .post(APIConstant.path.getEmployeeDataById, data)
                .then(async (res) => {
                    const response = await res.data[0][0];
                    if (res.success) {
                        Loader.hide();
                        setEmployeeId(response.EmployeeId);
                        setSecurityUserID(response.SecurityUserID);
                        setFirstName(response.FirstName);
                        setLastName(response.LastName);
                        const BirthDateParts = response.BirthDate ? response.BirthDate.split("-") : "";
                        setBirthDate(new Date(`${BirthDateParts[2]}-${BirthDateParts[1]}-${BirthDateParts[0]}`));
                        setMobileNo(response.MobileNo);
                        setEmail(response.Email);
                        setAddress(response.Address);
                        setIsExperience(response.IsExperience === "1" ? true : false);
                        const startDateParts = response.ExpStartDate ? response.ExpStartDate.split("-") : "";
                        setExpStartDate(new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`));
                        const endDateParts = response.ExpEndDate ? response.ExpEndDate.split("-") : "";
                        setExpEndDate(new Date(`${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`));
                        const JoiningDateParts = response.JoiningDate ? response.JoiningDate.split("-") : "";
                        setJoiningDate(new Date(`${JoiningDateParts[2]}-${JoiningDateParts[1]}-${JoiningDateParts[0]}`));
                        setDescription(response.Description);
                        setJobTitle(response.JobTitle);
                        setManager(response.Manager);
                        setSalary(response.Salary);
                        setJobType(response.JobType);
                        setWorkLocation(response.WorkLocation);

                        setEmergencyContact(response.EmergencyContact);
                        setQualification(response.qualification);
                        // getSubTypeOfPolicyMasterList(response.data[0]?.TypeOfPolicyMasterID);
                        // getModelMasterList(response.data[0]?.MakeMasterID);

                        // setPolicySrNo(response.data[0]?.PolicySrNo);
                        // setDateOfBooking(new Date(response.data[0]?.DateOfBooking));

                        // setNameOfInsured(response.data[0]?.NameOfInsuredMasterID);
                        // setCareOffMaster(response.data[0]?.CareOffMasterID);
                        // setNameOfInsuranceCompany(response.data[0]?.NameOfInsuranceCompanyMasterID);
                        // setTypeOfPolicy(response.data[0]?.TypeOfPolicyMasterID);
                        // setSubTypeOfPolicy(response.data[0]?.SubTypeOfPolicyMasterID);
                        // setMake(response.data[0]?.MakeMasterID);
                        // setModel(response.data[0]?.ModelMasterID);
                        // setIsTypeOfPolicyName(response.data[0]?.TypeOfPolicyMaster);
                        // setPrincipalEmployer(response.data[0]?.PrincipalEmployer);
                        // setRegistrationNo(response.data[0]?.RegistrationNo);
                        // setNoOfEmployees(response.data[0]?.NoOfEmployees);

                        //   setTotal(Number(response.data[0]?.Total));
                        //   setIsPolicyRenewal(response.data[0]?.IsPolicyRenewal === 1 ? true : false);
                        //   setIsNotDueDate(response.data[0]?.IsNotDueDate === 1 ? true : false);

                        let profilePhoto = [];
                        if (!CommonConfig.isEmpty(response.ProfilePhoto)) {
                            let convertedBase64Media = CommonConfig.convertImgToBase64(response.ProfilePhoto);
                            await convertedBase64Media.then(async dataUrl => {
                                let fileData = CommonConfig.base64toFile(await dataUrl, CommonConfig.findFileNameFromURL(response.ProfilePhoto));
                                var reader = new FileReader();
                                var url = reader.readAsDataURL(fileData);
                                reader.onloadend = function (e) {
                                }.bind(this);
                                if (fileData) {
                                    profilePhoto = [fileData];
                                }
                            });
                        };

                        let aadharCard = [];
                        if (!CommonConfig.isEmpty(response.AadharCard)) {
                            let convertedBase64Media = CommonConfig.convertImgToBase64(response.AadharCard);
                            await convertedBase64Media.then(async dataUrl => {
                                let fileData = CommonConfig.base64toFile(await dataUrl, CommonConfig.findFileNameFromURL(response.AadharCard));
                                var reader = new FileReader();
                                var url = reader.readAsDataURL(fileData);
                                reader.onloadend = function (e) {
                                }.bind(this);
                                if (fileData) {
                                    aadharCard = [fileData];
                                }
                            });
                        };
                        setPhoto(profilePhoto);
                        setAadharCard(aadharCard);
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

    const resetScreen = async () => {
        setEmployeeId(null);
        setSecurityUserID(null);

        setFirstName("");
        setFirstNameErr(false);
        setFirstNameErrText("");

        setLastName("");
        setLastNameErr(false);
        setLastNameErrText("");

        setBirthDate("");
        setBirthDateErr(false);
        setBirthDateErrText("");

        setMobileNo("");
        setMobileNoErr(false);
        setMobileNoErrText("");

        setEmail("");
        setEmailErr(false);
        setEmailErrText("");

        setAddress("");
        setAddressErr(false);
        setAddressErrText("");

        setIsExperience(false);

        setExpStartDate("");
        setExpStartDateErr(false);
        setExpStartDateErrText("");

        setExpEndDate("");
        setExpEndDateErr(false);
        setExpEndDateErrText("");

        setDescription("");
        setDescriptionErr(false);
        setDescriptionErrText("");

        setJoiningDate("");
        setJoiningDateErr(false);
        setJoiningDateErrText("");

        setJobTitle("");
        setJobTitleErr(false);
        setJobTitleErrText("");

        setManager("");
        setManagerErr(false);
        setManagerErrText("");

        setSalary("");
        setSalaryErr(false);
        setSalaryErrText("");

        setJobType("");
        setJobTypeErr(false);
        setJobTypeErrText("");

        setWorkLocation("workFromOffice");

        setEmergencyContact("");
        setEmergencyContactErr(false);
        setEmergencyContactErrText("");

        setQualification("");
        setQualificationErr(false);
        setQualificationErrText("");

        setPhoto("");
        setPhotoErr(false);
        setPhotoErrText("");

        setAadharCard("");
        setAadharCardErr(false);
        setAadharCardErrText("");
    };

    const handleChange = (e, type) => {
        if (type === "firstName") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setFirstName("");
                setFirstNameErr(true);
                setFirstNameErrText("Please enter first name");
            } else {
                setFirstName(e.target.value);
                setFirstNameErr(false);
                setFirstNameErrText("");
            }
        } else if (type === "lastName") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setLastName("");
                setLastNameErr(true);
                setLastNameErrText("Please enter last name");
            } else {
                setLastName(e.target.value);
                setLastNameErr(false);
                setLastNameErrText("");
            }
        } else if (type === "birthDate") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setBirthDate("");
                setBirthDateErr(true);
                setBirthDateErrText("Please enter birth date");
            } else {
                const selectedDate = new Date(e.value);
                const adjustedDate = new Date(
                    Date.UTC(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        selectedDate.getDate()
                    )
                );
                setBirthDate(adjustedDate);
                setBirthDateErr(false);
                setBirthDateErrText("");
            }
        } else if (type === "mobileNo") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setMobileNo("");
                setMobileNoErr(true);
                setMobileNoErrText("Please enter mobile number");
            } else {
                setMobileNo(e.target.value);
                setMobileNoErr(false);
                setMobileNoErrText("");
            }
        } else if (type === "email") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setEmail("");
                setEmailErr(true);
                setEmailErrText("Please enter email id");
            } else {
                setEmail(e.target.value);
                setEmailErr(false);
                setEmailErrText("");
            }
        } else if (type === "address") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setAddress("");
                setAddressErr(true);
                setAddressErrText("Please enter address");
            } else {
                setAddress(e.target.value);
                setAddressErr(false);
                setAddressErrText("");
            }
        } else if (type === "isExperience") {
            setIsExperience(e.checked)
            if (!e.checked) {
                setExpStartDate("");
                setExpEndDate("");
                setDescription("");
            }
        } else if (type === "expStartDate") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setExpStartDate("");
                setExpStartDateErr(true);
                setExpStartDateErrText(" Please enter Start Date");
            } else {
                const selectedDate = new Date(e.value);
                const adjustedDate = new Date(
                    Date.UTC(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        selectedDate.getDate()
                    )
                );
                setExpStartDate(adjustedDate);
                setExpStartDateErr(false);
                setExpStartDateErrText("");
            }
        } else if (type === "expEndDate") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setExpEndDate("");
                setExpEndDateErr(true);
                setExpEndDateErrText(" Please enter End Date");
            } else {
                const selectedDate = new Date(e.value);
                const adjustedDate = new Date(
                    Date.UTC(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        selectedDate.getDate()
                    )
                );
                setExpEndDate(adjustedDate);
                setExpEndDateErr(false);
                setExpEndDateErrText("");
            }
        } else if (type === "description") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setDescription("");
                setDescriptionErr(true);
                setDescriptionErrText("Please enter description");
            } else {
                setDescription(e.target.value);
                setDescriptionErr(false);
                setDescriptionErrText("");
            }
        } else if (type === "joiningDate") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setJoiningDate("");
                setJoiningDateErr(true);
                setJoiningDateErrText(" Please enter joining date");
            } else {
                const selectedDate = new Date(e.value);
                const adjustedDate = new Date(
                    Date.UTC(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        selectedDate.getDate()
                    )
                );
                setJoiningDate(adjustedDate);
                setJoiningDateErr(false);
                setJoiningDateErrText("");
            }
        } else if (type === "jobTitle") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setJobTitle("");
                setJobTitleErr(true);
                setJobTitleErrText("Please enter job title");
            } else {
                setJobTitle(e.target.value);
                setJobTitleErr(false);
                setJobTitleErrText("");
            }
        } else if (type === "manager") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setManager("");
                setManagerErr(true);
                setManagerErrText("Please enter manager");
            } else {
                setManager(e.target.value);
                setManagerErr(false);
                setManagerErrText("");
            }
        } else if (type === "salary") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setSalary("");
                setSalaryErr(true);
                setSalaryErrText("Please enter basic salary");
            } else {
                setSalary(e.target.value);
                setSalaryErr(false);
                setSalaryErrText("");
            }
        } else if (type === "jobType") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setJobType("");
                setJobTypeErr(true);
                setJobTypeErrText("Please enter job type");
            } else {
                setJobType(e.target.value);
                setJobTypeErr(false);
                setJobTypeErrText("");
            }
        } else if (type === "workLocation") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setWorkLocation("");
            } else {
                setWorkLocation(e.target.value);
            }
        } else if (type === "emergencyContact") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setEmergencyContact("");
                setEmergencyContactErr(true);
                setEmergencyContactErrText("Please enter emergency contect");
            } else {
                setEmergencyContact(e.target.value);
                setEmergencyContactErr(false);
                setEmergencyContactErrText("");
            }
        } else if (type === "qualification") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setQualification("");
                setQualificationErr(true);
                setQualificationErrText("Please enter qualification");
            } else {
                setQualification(e.target.value);
                setQualificationErr(false);
                setQualificationErrText("");
            }
        } else if (type === "aadharcard") {
            if (CommonConfig.isEmpty(e.target.value)) {
                setAadharCard("");
                setAadharCardErr(true);
                setAadharCardErrText("Please enter aadhar card");
            } else {
                setAadharCard(e.target.value);
                setAadharCardErr(false);
                setAadharCardErrText("");
            }
        } else if (type === 'photo') {
            if (CommonConfig.isEmpty(e.target.value)) {
                setPhoto("");
                setPhotoErr(true);
                setPhotoErrText("photo is required")
            } else {
                setPhoto(e.target.value);
                setPhotoErr(false);
                setPhotoErrText("");
            }
        }
    };

    const handleClose = async (type) => {
        if (type === "AddEmployee") {
            resetScreen();
            history.push('/employee');
        }
    };

    const validation = () => {
        let IsformValid = true;

        if (CommonConfig.isEmpty(firstName)) {
            setFirstNameErr(true);
            setFirstNameErrText("Name is required");
            IsformValid = false;
        } else {
            setFirstNameErr(false);
            setFirstNameErrText("");
        }
        if (CommonConfig.isEmpty(lastName)) {
            setLastNameErr(true);
            setLastNameErrText("last name is required");
            IsformValid = false;
        } else {
            setLastNameErr(false);
            setLastNameErrText("");
        }
        if (CommonConfig.isEmpty(birthDate)) {
            setBirthDateErr(true);
            setBirthDateErrText("Birth date is required");
            IsformValid = false;
        } else {
            setBirthDateErr(false);
            setBirthDateErrText("");
        }
        if (CommonConfig.isEmpty(mobileNo)) {
            setMobileNoErr(true);
            setMobileNoErrText("Mobile number is required");
            IsformValid = false;
        } else if (!mobileNo.match(CommonConfig.RegExp.phoneNumber)) {
            setMobileNoErr(true);
            setMobileNoErrText("Mobile number  is not valid");
            Toast.error({ message: "Invalid credentials" });
            IsformValid = false;
        } else {
            setMobileNoErr(false);
            setMobileNoErrText("");
        }
        if (CommonConfig.isEmpty(address)) {
            setAddressErr(true);
            setAddressErrText("Address is required");
            IsformValid = false;
        } else {
            setAddressErr(false);
            setAddressErrText("");
        }
        if (CommonConfig.isEmpty(email)) {
            setEmailErr(true);
            setEmailErrText("email Id is required");
            IsformValid = false;
        } else if (!email.match(CommonConfig.RegExp.email)) {
            setEmailErr(true);
            setEmailErrText("Email is not valid");
            Toast.error({ message: "Invalid credentials" });
            IsformValid = false;
        } else {
            setEmailErr(false);
            setEmailErrText("");
        }
        if (CommonConfig.isEmpty(joiningDate)) {
            setJoiningDateErr(true);
            setJoiningDateErrText("Joining date is required");
            IsformValid = false;
        } else {
            setJoiningDateErr(false);
            setJoiningDateErrText("");
        }
        if (CommonConfig.isEmpty(jobTitle)) {
            setJobTitleErr(true);
            setJobTitleErrText("Job title is required");
            IsformValid = false;
        } else {
            setJobTitleErr(false);
            setJobTitleErrText("");
        }
        if (CommonConfig.isEmpty(manager)) {
            setManagerErr(true);
            setManagerErrText("Manager is required");
            IsformValid = false;
        } else {
            setManagerErr(false);
            setManagerErrText("");
        }
        if (CommonConfig.isEmpty(salary)) {
            setSalaryErr(true);
            setSalaryErrText("Salary is required");
            IsformValid = false;
        } else {
            setSalaryErr(false);
            setSalaryErrText("");
        }
        if (CommonConfig.isEmpty(jobType)) {
            setJobTypeErr(true);
            setJobTypeErrText("Job type is required");
            IsformValid = false;
        } else {
            setJobTypeErr(false);
            setJobTypeErrText("");
        }
        if (CommonConfig.isEmpty(qualification)) {
            setQualificationErr(true);
            setQualificationErrText("Qualification is required");
            IsformValid = false;
        } else {
            setQualificationErr(false);
            setQualificationErrText("");
        }
        if (CommonConfig.isEmpty(emergencyContact)) {
            setEmergencyContactErr(true);
            setEmergencyContactErrText("Mobile number is required");
            IsformValid = false;
        } else if (!emergencyContact.match(CommonConfig.RegExp.phoneNumber)) {
            setEmergencyContactErr(true);
            setEmergencyContactErrText("Mobile number  is not valid");
            Toast.error({ message: "Invalid credentials" });
            IsformValid = false;
        } else {
            setEmergencyContactErr(false);
            setEmergencyContactErrText("");
        }
        if (isExperience) {
            if (CommonConfig.isEmpty(expStartDate)) {
                setExpStartDateErr(true);
                setExpStartDateErrText("Start date is required");
                IsformValid = false;
            } else {
                setExpStartDateErr(false);
                setExpStartDateErrText("");
            }
            if (CommonConfig.isEmpty(expEndDate)) {
                setExpEndDateErr(true);
                setExpEndDateErrText("End date is required");
                IsformValid = false;
            } else {
                setExpEndDateErr(false);
                setExpEndDateErrText("");
            }
            if (CommonConfig.isEmpty(description)) {
                setDescriptionErr(true);
                setDescriptionErrText("Description is required");
                IsformValid = false;
            } else {
                setDescriptionErr(false);
                setDescriptionErrText("");
            }
        }
        //   if (CommonConfig.isEmpty(photo)) {
        //     setPhotoErr(true);
        //     setPhotoErrText("Profile photo is required");
        //     IsformValid = false;
        //   } else {
        //     setPhotoErr(false);
        //     setPhotoErrText("");
        //   }
        // if (CommonConfig.isEmpty(aadharCard)) {
        //     setAadharCardErr(true);
        //     setAadharCardErrText("Birth date is required");
        //     IsformValid = false;
        // } else {
        //     setAadharCardErr(false);
        //     setAadharCardErrText("");
        // }
        return IsformValid;
    };

    const AddUpdateEmployee = async (e) => {
        e.preventDefault();
        if (validation()) {
            Loader.show();
            var formData = new FormData();
            let data = {
                EmployeeId: employeeId,
                SecurityUserID: securityUserID,
                FirstName: firstName,
                LastName: lastName,
                BirthDate: birthDate,
                MobileNo: mobileNo,
                Email: email,
                Address: address,
                IsExperience: isExperience === true ? 1 : 0,
                ExpStartDate: expStartDate,
                ExpEndDate: expEndDate,
                Description: description,
                JoiningDate: joiningDate,
                JobTitle: jobTitle,
                Manager: manager,
                Salary: salary,
                JobType: jobType,
                WorkLocation: workLocation,
                EmergencyContact: emergencyContact,
                Qualification: qualification,
            };
            formData.append('Data', JSON.stringify(data));
            formData.append('Photo', photo.length ? photo[0]?.file : []);
            formData.append('AadharCard', aadharCard.length ? aadharCard[0]?.file : []);

            try {
                api
                    .post(APIConstant.path.AddUpdateCompanyEmployee, formData)
                    .then((res) => {
                        const response = res.data;
                        if (res.success) {
                            resetScreen();
                            Toast.success({ message: res.message });
                            Loader.hide();
                            history.push('/employee');
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

    return (
        <div className="user-container">
            <div className="card-body">
                <h1>{employeeId ? "Edit Employee" : "Add Employee"}</h1>
                <div className="form-area">
                    <div className={"p-grid"}>
                        <div className="p-col-12 p-md-3 p-pt-2">
                            <div className="p-w-100 ">
                                <div className="custom-inputs">
                                    <label htmlFor="firstName">
                                        First name <span style={{ color: "red" }}>*</span>:{" "}
                                    </label>
                                    <InputText
                                        className="p-w-100 p-mt-2"
                                        id="firstName"
                                        type="text"
                                        placeholder="First name"
                                        value={firstName}
                                        autoFocus={true}
                                        onChange={(e) => handleChange(e, "firstName")}
                                        maxLength={30}
                                    />
                                </div>
                                <span className="error-msg" style={{ color: "red" }}>
                                    {firstNameErr ? firstNameErrText : null}
                                </span>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-3 p-pt-2">
                            <div className="p-w-100 ">
                                <div className="custom-inputs">
                                    <label htmlFor="lastName">
                                        Last name <span style={{ color: "red" }}>*</span>:{" "}
                                    </label>
                                    <InputText
                                        className="p-w-100 p-mt-2"
                                        id="lastName"
                                        type="text"
                                        placeholder="Last name"
                                        value={lastName}
                                        onChange={(e) => handleChange(e, "lastName")}
                                        maxLength={30}
                                    />
                                </div>
                                <span className="error-msg" style={{ color: "red" }}>
                                    {lastNameErr ? lastNameErrText : null}
                                </span>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-3 p-pt-2">
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
                        <div className="p-col-12 p-md-3 p-pt-2">
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
                        <div className="p-col-12 p-md-3 p-pt-2">
                            <div className="p-w-100 ">
                                <div className="custom-inputs">
                                    <span className="fromedate-field custom-inputs p-input-icon-right">
                                        <label htmlFor="birthDate">
                                            Birth Date <span style={{ color: "red" }}>*</span>:{" "}
                                        </label>
                                        <Calendar
                                            className="p-w-100 p-mt-0"
                                            id="birthDate"
                                            type="date"
                                            placeholder="dd/mm/yyyy"
                                            value={birthDate}
                                            onChange={(e) => handleChange(e, "birthDate")}
                                            dateFormat="dd/mm/yy"
                                        // showIcon
                                        />
                                    </span>
                                </div>
                                <span className="error-msg" style={{ color: "red" }}>
                                    {birthDateErr ? birthDateErrText : null}
                                </span>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-3 p-pt-2">
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
                        <div className="p-col-12 p-md-3 p-pt-2">
                            <div className="p-w-100 ">
                                <div className="custom-inputs">
                                    <span className="fromedate-field custom-inputs p-input-icon-right">
                                        <label htmlFor="joiningDate">
                                            Joining date <span style={{ color: "red" }}>*</span>:{" "}
                                        </label>
                                        <Calendar
                                            className="p-w-100 p-mt-0"
                                            id="joiningDate"
                                            type="date"
                                            placeholder="dd/mm/yyyy"
                                            value={joiningDate}
                                            onChange={(e) => handleChange(e, "joiningDate")}
                                            dateFormat="dd/mm/yy"
                                        // showIcon
                                        />
                                    </span>
                                </div>
                                <span className="error-msg" style={{ color: "red" }}>
                                    {joiningDateErr ? joiningDateErrText : null}
                                </span>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-3 p-pt-2">
                            <div className="p-w-100 ">
                                <div className="custom-inputs">
                                    <label htmlFor="jobTitle">
                                        Job title <span style={{ color: "red" }}>*</span>:{" "}
                                    </label>
                                    <InputText
                                        className="p-w-100 p-mt-2"
                                        id="jobTitle"
                                        type="text"
                                        placeholder="Job title"
                                        value={jobTitle}
                                        onChange={(e) => handleChange(e, "jobTitle")}
                                    // maxLength={30}
                                    />
                                </div>
                                <span className="error-msg" style={{ color: "red" }}>
                                    {jobTitleErr ? jobTitleErrText : null}
                                </span>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-3 p-pt-2">
                            <div className="p-w-100 ">
                                <div className="custom-inputs">
                                    <label htmlFor="manager">
                                        Manager <span style={{ color: "red" }}>*</span>:{" "}
                                    </label>
                                    <InputText
                                        className="p-w-100 p-mt-2"
                                        id="manager"
                                        type="text"
                                        placeholder="Manager"
                                        value={manager}
                                        onChange={(e) => handleChange(e, "manager")}
                                    // maxLength={30}
                                    />
                                </div>
                                <span className="error-msg" style={{ color: "red" }}>
                                    {managerErr ? managerErrText : null}
                                </span>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-3 p-pt-2">
                            <div className="p-w-100 ">
                                <div className="custom-inputs">
                                    <label htmlFor="salary">
                                        Salary <span style={{ color: "red" }}>*</span>:{" "}
                                    </label>
                                    <InputText
                                        className="p-w-100 p-mt-2"
                                        id="salary"
                                        type="text"
                                        placeholder="Salary"
                                        value={salary}
                                        onChange={(e) => handleChange(e, "salary")}
                                    // maxLength={30}
                                    />
                                </div>
                                <span className="error-msg" style={{ color: "red" }}>
                                    {salaryErr ? salaryErrText : null}
                                </span>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-3 p-pt-2">
                            <div className="p-w-100 ">
                                <div className="custom-inputs">
                                    <label htmlFor="jobType">
                                        Job type <span style={{ color: "red" }}>*</span>:{" "}
                                    </label>
                                    <InputText
                                        className="p-w-100 p-mt-2"
                                        id="jobType"
                                        type="text"
                                        placeholder="Job type"
                                        value={jobType}
                                        onChange={(e) => handleChange(e, "jobType")}
                                    // maxLength={30}
                                    />
                                </div>
                                <span className="error-msg" style={{ color: "red" }}>
                                    {jobTypeErr ? jobTypeErrText : null}
                                </span>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-3 p-pt-2">
                            <div className="p-w-100 ">
                                <div className="custom-inputs">
                                    <label htmlFor="workLocation">Work location :</label>
                                    <div className="flex gap-3" style={{ display: "flex" }}>
                                        <div className="p-pt-2">
                                            <RadioButton
                                                inputId="workFromOffice"
                                                name="workLocation"
                                                value="workFromOffice"
                                                onChange={(e) => handleChange(e, "workLocation")}
                                                checked={workLocation === "workFromOffice"}
                                            />
                                            <label htmlFor="workFromOffice" className="p-ml-2">
                                                Work from office
                                            </label>
                                        </div>
                                        <div className="flex align-items-center p-pt-2 p-ml-4">
                                            <RadioButton
                                                inputId="workFromHome"
                                                name="workLocation"
                                                value="workFromHome"
                                                onChange={(e) => handleChange(e, "workLocation")}
                                                checked={workLocation === "workFromHome"}
                                                className="mr-10"
                                            />
                                            <label htmlFor="workFromHome" className="p-ml-2">
                                                Work from home
                                            </label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-3 p-pt-2">
                            <div className="p-w-100 ">
                                <div className="custom-inputs">
                                    <label htmlFor="emergencyContact">
                                        Emergency contact <span style={{ color: "red" }}>*</span>:{" "}
                                    </label>
                                    <InputText
                                        className="p-w-100 p-mt-2"
                                        id="emergencyContact"
                                        type="text"
                                        placeholder="Emergency contact"
                                        value={emergencyContact}
                                        onChange={(e) => handleChange(e, "emergencyContact")}
                                        maxLength={10}
                                        keyfilter={"num"}
                                    />
                                </div>
                                <span className="error-msg" style={{ color: "red" }}>
                                    {emergencyContactErr ? emergencyContactErrText : null}
                                </span>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-3 p-pt-2">
                            <div className="p-w-100 ">
                                <div className="custom-inputs">
                                    <label htmlFor="qualification">
                                        Qualification <span style={{ color: "red" }}>*</span>:{" "}
                                    </label>
                                    <InputText
                                        className="p-w-100 p-mt-2"
                                        id="qualification"
                                        type="text"
                                        placeholder="Qualification"
                                        value={qualification}
                                        onChange={(e) => handleChange(e, "qualification")}
                                    />
                                </div>
                                <span className="error-msg" style={{ color: "red" }}>
                                    {qualificationErr ? qualificationErrText : null}
                                </span>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-3 p-pt-2">
                            <div className="p-w-100 ">
                                <div className="custom-inputs">
                                    <label htmlFor="userType">Profile Photo </label>
                                    <span className="bg-gray-200 p-4 rounded-md">
                                        <FilePond
                                            files={photo}
                                            allowMultiple={false}
                                            acceptedFileTypes={["Photo/pdf", "image/*"]}
                                            maxFileSize="5MB"
                                            name="files"
                                            labelIdle={
                                                'Images/PDF (max size 5MB) <span class="block filepond--label-action">Browse</span>'
                                            }
                                            onupdatefiles={setPhoto}
                                            maxFiles={1}
                                            className="w-full"
                                        />
                                    </span>
                                </div>
                                <span className="error-msg">
                                    {photoErr ? photoErrText : null}
                                </span>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-3 p-pt-2">
                            <div className="p-w-100 ">
                                <div className="custom-inputs">
                                    <label htmlFor="userType">Aadhar Card</label>
                                    <span className="bg-gray-200 p-4 rounded-md">
                                        <FilePond
                                            files={aadharCard}
                                            allowMultiple={false}
                                            acceptedFileTypes={["Photo/pdf", "image/*"]}
                                            maxFileSize="5MB"
                                            name="files"
                                            labelIdle={
                                                'Images/PDF (max size 5MB) <span class="block filepond--label-action">Browse</span>'
                                            }
                                            onupdatefiles={setAadharCard}
                                            maxFiles={1}
                                            className="w-full"
                                        />
                                    </span>
                                </div>
                                <span className="error-msg">
                                    {aadharCardErr ? aadharCardErrText : null}
                                </span>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-3 p-pt-2">
                            <div className="p-w-100  ">
                                <div className="custom-inputs">
                                    <Checkbox inputId={"isExperience"} checked={isExperience} onChange={(e) => handleChange(e, 'isExperience')} className="p-mt-5" />
                                    <label htmlFor="isExperience" className="p-ml-2">IS Experience </label>
                                </div>
                            </div>
                        </div>
                        {isExperience && (
                            <>
                                <div className="p-col-12 p-md-3 p-pt-2">
                                    <div className="p-w-100 ">
                                        <div className="custom-inputs">
                                            <span className="fromedate-field custom-inputs p-input-icon-right">
                                                <label htmlFor="expStartDate">
                                                    Start Date <span style={{ color: "red" }}>*</span>:{" "}
                                                </label>
                                                <Calendar
                                                    className="p-w-100 p-mt-0"
                                                    id="expStartDate"
                                                    type="date"
                                                    placeholder="dd/mm/yyyy"
                                                    value={expStartDate}
                                                    onChange={(e) => handleChange(e, "expStartDate")}
                                                    dateFormat="dd/mm/yy"
                                                // showIcon
                                                />
                                            </span>
                                        </div>
                                        <span className="error-msg" style={{ color: "red" }}>
                                            {expStartDateErr ? expStartDateErrText : null}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-col-12 p-md-3 p-pt-2">
                                    <div className="p-w-100 ">
                                        <div className="custom-inputs">
                                            <span className="fromedate-field custom-inputs p-input-icon-right">
                                                <label htmlFor="expEndDate">
                                                    End Date <span style={{ color: "red" }}>*</span>:{" "}
                                                </label>
                                                <Calendar
                                                    className="p-w-100 p-mt-0"
                                                    id="expEndDate"
                                                    type="date"
                                                    placeholder="dd/mm/yyyy"
                                                    value={expEndDate}
                                                    onChange={(e) => handleChange(e, "expEndDate")}
                                                    dateFormat="dd/mm/yy"
                                                // showIcon
                                                />
                                            </span>
                                        </div>
                                        <span className="error-msg" style={{ color: "red" }}>
                                            {expEndDateErr ? expEndDateErrText : null}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-col-12 p-md-3 p-pt-2">
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
                                            // maxLength={30}
                                            />
                                        </div>
                                        <span className="error-msg" style={{ color: "red" }}>
                                            {descriptionErr ? descriptionErrText : null}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
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
    );
};

export default AddEmployee;