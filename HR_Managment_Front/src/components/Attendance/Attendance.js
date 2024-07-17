import React, { useCallback, useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import CommonConfig from "../../utils/constant";
import { Card } from "primereact/card";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import Loader from "../Shared/Loader/Loader";
import APIConstant from "../../utils/PathConstants";
import Toast from "../Shared/Toast/Toast";
import api from "../../utils/apiClient";

const Attendance = () => {
  const [attendanceId, setAttendanceId] = useState(null);
  const [securityUserID, setSecurityUserID] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");
  const [isUserPunchIn, setIsUserPunIn] = useState(false);
  const [isUserPunchOut, setIsUserPunOut] = useState(false);

  const getCurrentMonth = () => {
    const currentDate = new Date();
    return currentDate.getMonth() + 1;
  };
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const monthList = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];

  const [attendanceList, setAttendanceList] = useState([]);
  const [userType, setUserType] = "Admin";

  useEffect(() => {
    const loginData = CommonConfig.loginData();
    setSecurityUserID(loginData?.SecurityUserID);
    // setUserType(loginData?.UserType);    
    getAttendanceList();

    const interval = setInterval(() => {
      const now = new Date();
      const dateTimeString = `${getDayOfWeek(
        now.getDay()
      )}, ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      setCurrentDateTime(dateTimeString);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedMonth]);

  const getDayOfWeek = (dayIndex) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[dayIndex];
  };

  const getAttendanceList = async () => {
    try {
      Loader.show();
      let data = {
        UserID: CommonConfig.loginData()?.SecurityUserID,
        Month: selectedMonth,
      };
      await api
        .post(APIConstant.path.getAttendanceDataList, data)
        .then(async (res) => {
          let response = await res.data[0];
          if (res.success) {
            setAttendanceList(response);
            const lastAttendance =
              response.length > 0
                ? response[response.length - 1]
                : null;
            if (lastAttendance) {
              const lastAttendanceId = lastAttendance.AttendanceID;
              setAttendanceId(lastAttendanceId);
              const lastInTime = lastAttendance.InTime;
              const lastOutTime = lastAttendance.OutTime;
              if (lastOutTime === null && lastInTime !== null) {
                setIsUserPunIn(true);
                setIsUserPunOut(false);
              } else if (lastOutTime !== null && lastInTime !== null) {
                setIsUserPunIn(false);
                setIsUserPunOut(true);
              } else {
                setIsUserPunIn(false);
                setIsUserPunOut(false);
              }
              setInTime(lastInTime);
              setOutTime(lastOutTime);
            }
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
      // Toast.error({ message: err });
    }
  };


  const speak = (message) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    const voices = window.speechSynthesis.getVoices();

    const femaleVoice = voices.find(voice => voice.name === 'Google UK English Female' || voice.name === 'Microsoft David Desktop - English (United States)');

    if (femaleVoice) {
      speech.voice = femaleVoice;
    } else {
      console.warn('Female voice not found. Using default voice.');
    }
    window.speechSynthesis.speak(speech);
  };


  const handleClickPunchOut = async (e) => {
    if (isUserPunchOut) {
      speak("You are already punched out.");
      // alert("You are already punched out.");
    } else {
      Loader.show();
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const time = `${hours}:${minutes}:${seconds}`;

      const data = {
        AttendanceId: attendanceId,
        UserId: securityUserID,
        Date: now.toISOString(),
        Day: getDayOfWeek(new Date().getDay()),
        Time: time,
      };
      try {
        const response = await api.post(
          APIConstant.path.AddUpdateUserAttendance,
          data
        );
        if (response.success) {
          // Toast.success({ message: response.message });
          speak(response.message);
          getAttendanceList();
          setAttendanceId(null);
        } else {
          Toast.error({ message: response.message });
        }
      } catch (error) {
        Toast.error({ message: error.message });
      } finally {
        Loader.hide();
      }
    }
  };

  const handleClickPunchIn = async (e) => {
    e.preventDefault();
    if (isUserPunchIn) {
      speak("I love you jan, marriage kyare karva");
      // speak("You are already punched in.");
      // alert("You are already punched in.");
    } else {
      Loader.show();
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const time = `${hours}:${minutes}:${seconds}`;

      const data = {
        // AttendanceId: attendanceId,
        UserId: securityUserID,
        Date: now.toISOString(),
        Day: getDayOfWeek(new Date().getDay()),
        Time: time,
      };
      console.log("data", data);
      // try {
      api
        .post(APIConstant.path.AddUpdateUserAttendance, data)
        .then((Res) => {
          if (Res.success) {
            Loader.hide();
            // Toast.success({ message: Res.message });
            speak(Res.message);
            getAttendanceList();
          } else {
            Loader.hide();
            Toast.error({ message: Res.message });
          }
        })
        .catch((err) => {
          Loader.hide();
          // Toast.error({ message: err });
        });
      // } catch (err) {
      //   Loader.hide();
      //   Toast.error({ message: err });
      // }
    }
  };

  const handleMonthChange = (e, type) => {
    if (type === "selectedMonth") {
      let month = e.value;
      setSelectedMonth(month);
      getAttendanceList();
    }
  };

  return (
    <div className="user-container">
      <div className="card-header">
        <div className="card-title p-d-lg-flex p-ai-center p-w-100">
          <h3 className="p-mb-3 p-mb-lg-0">Attendance</h3>
          <div className="p-ml-auto p-d-lg-flex p-ai-center">
            <div className="custom-inputs">
              <p>{currentDateTime}</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="p-d-flex p-jc-center">
        <div className="p-d-flex">
          <div onClick={(e) => handleClickPunchIn(e)}>
            <Card
              className="p-shadow-2 p-p-2"
              style={{
                backgroundColor: "green",
                color: "white",
                width: "150px",
                height: "150px",
                marginRight: "20px",
                position: "relative",
              }}
            >
              <h2
                className="p-ml-2"
                style={{ position: "absolute", top: "0", left: "0" }}
              >
                IN
              </h2>
              <div className="p-d-flex p-ai-center p-jc-center">
                <LoginIcon style={{ fontSize: "3rem" }} />
              </div>
              <div
                className="p-d-flex p-ai-center p-jc-center"
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "100%",
                }}
              >
                <p className="p-m-0">{inTime}</p>
              </div>
            </Card>
          </div>
          <div onClick={(e) => handleClickPunchOut(e)}>
            <Card
              className="p-shadow-2 p-p-2"
              style={{
                backgroundColor: "red",
                color: "white",
                width: "150px",
                height: "150px",
                //   marginRight: "20px",
                position: "relative",
              }}
            >
              <h2
                className="p-ml-2"
                style={{ position: "absolute", top: "0", left: "0" }}
              >
                OUT
              </h2>
              <div className="p-d-flex p-ai-center p-jc-center">
                <LogoutIcon
                  style={{ fontSize: "3rem", transform: "rotate(180deg)" }}
                />
              </div>
              <div
                className="p-d-flex p-ai-center p-jc-center"
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "100%",
                }}
              >
                <p className="p-m-0">{outTime}</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <br />
      {/* {userType === "Employee" && ( */}
      <div className="card-title p-d-lg-flex p-ai-center p-w-100">
        <div className="p-ml-auto p-d-lg-flex p-ai-center">
          <div className="custom-inputs" style={{ hight: "15px" }}>
            <Dropdown
              optionLabel="name"
              optionValue="value"
              value={selectedMonth}
              options={monthList}
              filter
              onChange={(e) => handleMonthChange(e, "selectedMonth")}
              placeholder="Select Month"
            />
          </div>
        </div>
      </div>
      <div className="card">
        <DataTable
          //   globalFilter={globalFilter}
          paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          className="custom-table"
          value={attendanceList}
          scrollable
          scrollHeight="calc(100vh - 203px)"
        >
          <Column field="Date" header="Date" style={{ width: "25%" }} />
          <Column field="Day" header="Day" style={{ width: "25%" }} />
          <Column field="InTime" header="In" style={{ width: "25%" }} />
          <Column field="OutTime" header="Out" style={{ width: "25%" }} />
          <Column
            field="TotalTime"
            header="TotalTime"
            style={{ width: "25%" }}
          />
        </DataTable>
      </div>
      {/* )} */}
    </div>
  );
};

export default Attendance;
