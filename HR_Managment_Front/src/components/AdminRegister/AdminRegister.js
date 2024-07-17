import React, { Component, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/svgs/logo.svg";
import zeroSVG from "../../assets/svgs/ZeroLogin.svg";
import api from "../../utils/apiClient";
import CommonConfig from "../../utils/constant";
import APIConstant from "../../utils/PathConstants";
import Toast from "../Shared/Toast/Toast";
import Loader from "../Shared/Loader/Loader";
import { useState } from "react";
import GoogleMapReact from "google-map-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const AnyReactComponent = () => (
  <div style={{ color: "red", fontSize: "50px" }}>
    <FontAwesomeIcon icon={faMapMarkerAlt} />
  </div>
);
const GOOGLE_MAP_API_KEY = "AIzaSyAww6TxPSzQbg74ljJahxvuLHmRfICHbf4";

const AdminRegister = () => {
  const [securityUserID, setSecurityUserID] = useState(null);

  const [companyName, setCompanyName] = useState("");
  const [companyNameErr, setCompanyNameErr] = useState(false);
  const [companyNameErrText, setCompanyNameErrText] = useState("");

  const [logoURL, setLogoURL] = useState("");
  const [logoURLErr, setLogoURLErr] = useState(false);
  const [logoURLErrText, setLogoURLErrText] = useState("");

  const [companyAddress, setCompanyAddress] = useState("");
  const [companyAddressErr, setCompanyAddressErr] = useState(false);
  const [companyAddressErrText, setCompanyAddressErrText] = useState("");

  const [state, setState] = useState("");
  const [stateErr, setStateErr] = useState(false);
  const [stateErrText, setStateErrText] = useState("");

  const [district, setDistrict] = useState("");
  const [districtErr, setDistrictErr] = useState(false);
  const [districtErrText, setDistrictErrText] = useState("");

  const [pinCode, setPinCode] = useState("");
  const [pinCodeErr, setPinCodeErr] = useState(false);
  const [pinCodeErrText, setPinCodeErrText] = useState("");

  const [gstNumber, setGSTNumber] = useState("");
  const [gstNumberErr, setGSTNumberErr] = useState(false);
  const [gstNumberErrText, setGSTNumberErrText] = useState("");

  const [firstName, setFirstName] = useState("");
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [firstNameErrText, setFirstNameErrText] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameErr, setLastNameErr] = useState(false);
  const [lastNameErrText, setLastNameErrText] = useState("");

  const [emailId, setEmailId] = useState("");
  const [emailIdErr, setEmailIdErr] = useState(false);
  const [emailIdErrText, setEmailIdErrText] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberErr, setMobileNumberErr] = useState(false);
  const [mobileNumberErrText, setMobileNumberErrText] = useState("");

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordErrText, setPasswordErrText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [ownerAddress, setOwnerAddress] = useState("");
  const [ownerAddressErr, setOwnerAddressErr] = useState(false);
  const [ownerAddressErrText, setOwnerAddressErrText] = useState("");

  const [markerPosition, setMarkerPosition] = useState("");
  const history = useHistory();

  useEffect(() => {
    const loginData = CommonConfig.loginData();
    setSecurityUserID(loginData?.UserId);
  }, []);

  const handleChange = (e, type) => {
    if (type === "companyName") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setCompanyName("");
        setCompanyNameErr(true);
        setCompanyNameErrText("Please enter company name");
      } else {
        setCompanyName(e.target.value);
        setCompanyNameErr(false);
        setCompanyNameErrText("");
      }
    }
    if (type === "logoURL") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setLogoURL("");
        setLogoURLErr(true);
        setLogoURLErrText("Please enter logo URL");
      } else {
        setLogoURL(e.target.value);
        setLogoURLErr(false);
        setLogoURLErrText("");
      }
    }
    if (type === "companyAddress") {
      if (CommonConfig.isEmpty(e)) {
        setCompanyAddress("");
        setCompanyAddressErr(true);
        setCompanyAddressErrText("Please enter company address");
      } else {
        setCompanyAddress(e);
        setCompanyAddressErr(false);
        setCompanyAddressErrText("");
      }
    }
    if (type === "state") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setState("");
        setStateErr(true);
        setStateErrText("Please enter state");
      } else {
        setState(e.target.value);
        setStateErr(false);
        setStateErrText("");
      }
    }
    if (type === "district") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setDistrict("");
        setDistrictErr(true);
        setDistrictErrText("Please enter district");
      } else {
        setDistrict(e.target.value);
        setDistrictErr(false);
        setDistrictErrText("");
      }
    }
    if (type === "pinCode") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setPinCode("");
        setPinCodeErr(true);
        setPinCodeErrText("Please enter pin code");
      } else {
        setPinCode(e.target.value);
        setPinCodeErr(false);
        setPinCodeErrText("");
      }
    }
    if (type === "gstNumber") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setGSTNumber("");
        setGSTNumberErr(true);
        setGSTNumberErrText("Please enter GST number");
      } else {
        setGSTNumber(e.target.value);
        setGSTNumberErr(false);
        setGSTNumberErrText("");
      }
    }

    if (type === "firstName") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setFirstName("");
        setFirstNameErr(true);
        setFirstNameErrText("Please enter FirstName");
      } else {
        setFirstName(e.target.value);
        setFirstNameErr(false);
        setFirstNameErrText("");
      }
    }
    if (type === "lastName") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setLastName("");
        setLastNameErr(true);
        setLastNameErrText("Please enter LastName");
      } else {
        setLastName(e.target.value);
        setLastNameErr(false);
        setLastNameErrText("");
      }
    }

    if (type === "emailId") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setEmailId("");
        setEmailIdErr(true);
        setEmailIdErrText("Please enter EmailId");
      } else {
        setEmailId(e.target.value);
        setEmailIdErr(false);
        setEmailIdErrText("");
      }
    }
    if (type === "password") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setPassword("");
        setPasswordErr(true);
        setPasswordErrText("Please enter Password");
      } else {
        setPassword(e.target.value);
        setPasswordErr(false);
        setPasswordErrText("");
      }
    }
    if (type === "mobileNumber") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setMobileNumber("");
        setMobileNumberErr(true);
        setMobileNumberErrText("Please enter MobileNumber");
      } else {
        setMobileNumber(e.target.value);
        setMobileNumberErr(false);
        setMobileNumberErrText("");
      }
    }
    if (type === "ownerAddress") {
      if (CommonConfig.isEmpty(e.target.value)) {
        setOwnerAddress("");
        setOwnerAddressErr(true);
        setOwnerAddressErrText("Please enter owner address");
      } else {
        setOwnerAddress(e.target.value);
        setOwnerAddressErr(false);
        setOwnerAddressErrText("");
      }
    }
  };

  const handleSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);
      const addressComponents = results[0]?.address_components;

      if (addressComponents) {
        let newState = "";
        let newDistrict = "";
        let newPinCode = "";
        let newLatLng = { lat: 0, lng: 0 };

        for (let component of addressComponents) {
          const types = component.types;

          if (types.includes("administrative_area_level_1")) {
            newState = component.long_name;
          } else if (types.includes("administrative_area_level_3")) {
            newDistrict = component.long_name;
          } else if (types.includes("postal_code")) {
            newPinCode = component.long_name;
          }
        }

        setState(newState);
        setDistrict(newDistrict);
        setPinCode(newPinCode);
        setCompanyAddress(value);

        const latLng = await getLatLng(results[0]);
        newLatLng = latLng;

        setMarkerPosition(newLatLng);
      }
    } catch (error) {
      console.error("Error fetching address data", error);
    }
  };

  const validate = (e) => {
    let formIsValid = true;
    if (firstName === "" || firstName === null) {
      setFirstNameErr(true);
      setFirstNameErrText("First name is required");
      formIsValid = false;
    } else {
      setFirstNameErr(false);
      setFirstNameErrText("");
    }
    if (lastName === "" || lastName === null) {
      setLastNameErr(true);
      setLastNameErrText("Last name is required");
      formIsValid = false;
    } else {
      setLastNameErr(false);
      setLastNameErrText("");
    }

    if (password === "" || password === null) {
      setPasswordErr(true);
      setPasswordErrText("Password is required");
      formIsValid = false;
    } else {
      setPasswordErr(false);
      setPasswordErrText("");
    }
    if (emailId === "" || emailId === null) {
      setEmailIdErr(true);
      setEmailIdErrText("Email is required");
      formIsValid = false;
    } else if (!emailId.match(CommonConfig.RegExp.email)) {
      setEmailIdErr(true);
      setEmailIdErrText("Email  is not valid");
      Toast.error({ message: "Invalid credentials" });
      formIsValid = false;
    } else {
      setEmailIdErr(false);
      setEmailIdErrText("");
    }
    if (mobileNumber === "" || mobileNumber === null) {
      setMobileNumberErr(true);
      setMobileNumberErrText("Mobile number is required");
      formIsValid = false;
    } else if (!mobileNumber.match(CommonConfig.RegExp.phoneNumber)) {
      setMobileNumberErr(true);
      setMobileNumberErrText("Mobile number  is not valid");
      Toast.error({ message: "Invalid credentials" });
      formIsValid = false;
    } else {
      setMobileNumberErr(false);
      setMobileNumberErrText("");
    }
    if (ownerAddress === "" || ownerAddress === null) {
      setOwnerAddressErr(true);
      setOwnerAddressErrText("Address is required");
      formIsValid = false;
    } else {
      setOwnerAddressErr(false);
      setOwnerAddressErrText("");
    }

    return formIsValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validate()) {
      Loader.show();
      let data = {
        SecurityUserID: securityUserID,
        CompanyName: companyName,
        LogoURL: logoURL,
        CompanyAddress: companyAddress,
        State: state,
        District: district,
        PinCode: pinCode,
        GSTNumber: gstNumber,
        FirstName: firstName,
        LastName: lastName,
        EmailId: emailId,
        MobileNumber: mobileNumber,
        Password: password,
        OwnerAddress: ownerAddress,
      };
      console.log("data", data);
      try {
        api
          .post(APIConstant.path.RegisterUser, data)
          .then((Response) => {
            let Res = Response.data
            if (Response.success) {
              Loader.hide();
              history.push("/");
              Toast.success({ message: Res[0][0].Message });
            } else {
              Loader.hide();
              Toast.error({ message: Res[0][0].Message });
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
  };


  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <div className="card-header">
          <div className="card-title p-d-lg-flex p-ai-center p-w-100">
            <h3 className="p-mb-3 p-mb-lg-0 p-pt-5">Admin Register</h3>
          </div>
        </div>
        <div>
          <div className="card-body p-w-100">
            <div className="form-area">
              <div className="login-tag-line">
                <span style={{ fontSize: "1.3em", marginRight: "0.5em" }}>
                  Company Details
                </span>
              </div>
              <div className="p-grid">
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <span className="date-field custom-inputs p-input-icon-right">
                        <label
                          htmlFor="companyName"
                          style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                        >
                          Company Name <span style={{ color: "red" }}>*</span>:{" "}
                        </label>
                        <InputText
                          id="companyName"
                          placeholder="Company Name"
                          className={
                            companyNameErr
                              ? "p-w-100 p-invalid block"
                              : "p-w-100"
                          }
                          type="text"
                          value={companyName}
                          onChange={(e) => handleChange(e, "companyName")}
                        />
                      </span>
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {companyNameErr ? companyNameErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label
                        htmlFor="logoURL"
                        style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                      >
                        Logo URL <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <InputText
                        id="logoURL"
                        placeholder="Logo URL"
                        className={
                          logoURLErr ? "p-w-100 p-invalid block" : "p-w-100"
                        }
                        type="text"
                        value={logoURL}
                        onChange={(e) => handleChange(e, "logoURL")}
                      />
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {logoURLErr ? logoURLErrText : null}
                    </span>
                  </div>
                </div>

                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label
                        htmlFor="companyAddress"
                        style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                      >
                        Company Address <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <PlacesAutocomplete
                        className={
                          companyAddressErr
                            ? "p-w-100 p-invalid block"
                            : "p-w-100"
                        }
                        value={companyAddress}
                        onChange={(e) => handleChange(e, "companyAddress")}
                        onSelect={handleSelect}
                        searchOptions={{ types: ["address"] }}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading,
                        }) => (
                          <div>
                            <InputText
                              {...getInputProps({
                                placeholder: "Company Address",
                                className: "location-search-input p-w-100",
                              })}
                            />
                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                  ? "suggestion-item--active"
                                  : "suggestion-item";
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {companyAddressErr ? companyAddressErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label
                        htmlFor="name"
                        style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                      >
                        State <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <InputText
                        id="state"
                        placeholder="State"
                        className={
                          stateErr ? "p-w-100 p-invalid block" : "p-w-100"
                        }
                        type="text"
                        value={state}
                        onChange={(e) => handleChange(e, "state")}
                      />
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {stateErr ? stateErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label
                        htmlFor="district"
                        style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                      >
                        District <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <InputText
                        id="district"
                        placeholder="District"
                        className={
                          districtErr ? "p-w-100 p-invalid block" : "p-w-100"
                        }
                        type="text"
                        value={district}
                        onChange={(e) => handleChange(e, "district")}
                      />
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {districtErr ? districtErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label
                        htmlFor="pinCode"
                        style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                      >
                        Pin Code <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <InputText
                        id="pinCode"
                        placeholder="Pin Code"
                        className={
                          pinCodeErr ? "p-w-100 p-invalid block" : "p-w-100"
                        }
                        type="text"
                        value={pinCode}
                        onChange={(e) => handleChange(e, "pinCode")}
                      />
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {pinCodeErr ? pinCodeErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <label
                        htmlFor="gstNumber"
                        style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                      >
                        GST Number <span style={{ color: "red" }}>*</span>:{" "}
                      </label>
                      <InputText
                        id="gstNumber"
                        placeholder="GST Number"
                        className={
                          gstNumberErr ? "p-w-100 p-invalid block" : "p-w-100"
                        }
                        type="text"
                        value={gstNumber}
                        onChange={(e) => handleChange(e, "gstNumber")}
                      />
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {gstNumberErr ? gstNumberErrText : null}
                    </span>
                  </div>
                </div>
              </div>
              <div className="login-tag-line">
                <span style={{ fontSize: "1.3em", marginRight: "0.5em" }}>
                  Owner Details
                </span>
              </div>
              <div className="p-grid">
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <span className="date-field custom-inputs p-input-icon-right">
                        <label
                          htmlFor="firstName"
                          style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                        >
                          First Name <span style={{ color: "red" }}>*</span>:{" "}
                        </label>
                        <InputText
                          id="firstName"
                          placeholder="First Name"
                          className={
                            firstNameErr ? "p-w-100 p-invalid block" : "p-w-100"
                          }
                          type="text"
                          value={firstName}
                          onChange={(e) => handleChange(e, "firstName")}
                        />
                      </span>
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {firstNameErr ? firstNameErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <span className="date-field custom-inputs p-input-icon-right">
                        <label
                          htmlFor="lastName"
                          style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                        >
                          Last Name <span style={{ color: "red" }}>*</span>:{" "}
                        </label>
                        <InputText
                          id="lastName"
                          placeholder="Last Name"
                          className={
                            lastNameErr ? "p-w-100 p-invalid block" : "p-w-100"
                          }
                          type="text"
                          value={lastName}
                          onChange={(e) => handleChange(e, "lastName")}
                        />
                      </span>
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {lastNameErr ? lastNameErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <span className="date-field custom-inputs p-input-icon-right">
                        <label
                          htmlFor="emailId"
                          style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                        >
                          Email ID <span style={{ color: "red" }}>*</span>:{" "}
                        </label>
                        <InputText
                          id="emailId"
                          placeholder="Email Id"
                          className={
                            emailIdErr ? "p-w-100 p-invalid block" : "p-w-100"
                          }
                          type="text"
                          value={emailId}
                          onChange={(e) => handleChange(e, "emailId")}
                        />
                      </span>
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {emailIdErr ? emailIdErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <span className="date-field custom-inputs p-input-icon-right">
                        <label
                          htmlFor="mobileNumber"
                          style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                        >
                          Mobile Number <span style={{ color: "red" }}>*</span>:{" "}
                        </label>
                        <InputText
                          id="mobileNumber"
                          placeholder="9999988888"
                          className={
                            mobileNumberErr
                              ? "p-w-100 p-invalid block"
                              : "p-w-100"
                          }
                          type="text"
                          value={mobileNumber}
                          onChange={(e) => handleChange(e, "mobileNumber")}
                          keyfilter={"num"}
                          maxLength={10}
                        />
                      </span>
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {mobileNumberErr ? mobileNumberErrText : null}
                    </span>
                  </div>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <span className="password-field custom-inputs p-input-icon-right">
                    <label
                      htmlFor="password"
                      style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                    >
                      Password<span style={{ color: "red" }}>*</span>
                    </label>
                    <InputText
                      id="password"
                      placeholder="Password"
                      className={
                        passwordErr ? "p-w-100 p-invalid block" : "p-w-100"
                      }
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                    <i
                      className={
                        showPassword
                          ? "icon-view tailer-icon"
                          : "icon-view-off tailer-icon"
                      }
                      onClick={() => togglePasswordVisibility()}
                    ></i>
                  </span>
                  <span className="error-msg">
                    {passwordErr
                      ? CommonConfig.showErrorMsg(passwordErrText)
                      : null}
                  </span>
                </div>
                <div className="p-col-12 p-md-6 p-pt-2">
                  <div className="p-w-100 ">
                    <div className="custom-inputs">
                      <span className="date-field custom-inputs p-input-icon-right">
                        <label
                          htmlFor="ownerAddress"
                          style={{ fontSize: "1.2em", marginRight: "0.5em" }}
                        >
                          Owner Address <span style={{ color: "red" }}>*</span>:{" "}
                        </label>
                        <InputText
                          id="address"
                          placeholder="Owner Address"
                          className={
                            ownerAddressErr
                              ? "p-w-100 p-invalid block"
                              : "p-w-100"
                          }
                          type="text"
                          value={ownerAddress}
                          onChange={(e) => handleChange(e, "ownerAddress")}
                        />
                      </span>
                    </div>
                    <span className="error-msg" style={{ color: "red" }}>
                      {ownerAddressErr ? ownerAddressErrText : null}
                    </span>
                  </div>
                </div>
                <br />
                <div className="p-w-100">
                  <button
                    type="submit"
                    className="login-btn"
                    onClick={(e) => handleRegister(e)}
                  >
                    <span
                      style={{ fontSize: "1.3em", marginRight: "0.5em" }}
                    >
                      Register Now
                    </span>
                  </button>
                </div>
                <div>
                  <p>
                    If you are already registered, please{" "}
                    <a href="/login">Login</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "100vh", width: "50%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
          defaultCenter={{ lat: 10.99835602, lng: 77.01502627 }}
          defaultZoom={11}
          center={markerPosition}
        >
          <AnyReactComponent
            lat={markerPosition.lat}
            lng={markerPosition.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default AdminRegister;