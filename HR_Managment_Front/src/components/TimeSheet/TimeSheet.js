/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import api from "../../utils/apiClient";
import CommonConfig from "../../utils/constant";
import APIConstant from "../../utils/PathConstants";
import { Sidebar } from "primereact/sidebar";
import Toast from "../Shared/Toast/Toast";
import Loader from "../Shared/Loader/Loader";

const TimeSheet = () => {
  const [securityUserID, setSecurityUserID] = useState(
    CommonConfig.loginData()?.UserId
  );
  const [timeSheetList, setTimeSheetList] = useState([]);



  useEffect(() => {
    const loginData = CommonConfig.loginData();
    setSecurityUserID(loginData?.UserId);
    // getUserList();
    getTimeSheetList();
  }, []);

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [day, month, year] = dateString.split("-"); // Assuming date format is DD-MM-YYYY
    const date = new Date(`${month}/${day}/${year}`);
    return daysOfWeek[date.getDay()];
  };

  const getTimeSheetList = async (ID) => {
    try {
      let data = {
        UserId: CommonConfig.loginData().UserId,
      };
      await api
        .post(APIConstant.path.getTimeSheetDataList, data)
        .then(async (res) => {
          if (res.success) {
            const TotalAttendance = res.data.recordsets[0][0].TotalAttendance;
            const TotalLeaveDays = res.data.recordsets[1][0].TotalLeaveDays;
            const totalOverTime = res.data.recordsets[2][0].totalOverTime;
            const dayWiseData = res.data.recordsets[3];
            const formattedDayWiseData = dayWiseData.map((item) => ({
              ...item,
              day: getDayOfWeek(item.Date),
            }));
            const formattedData = [
              {
                TotalAttendance,
                TotalLeaveDays,
                totalOverTime,
                // dayWiseData,
                formattedDayWiseData,
              },
            ];
            setTimeSheetList(formattedData[0]);
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
  console.log("err", timeSheetList);

  return (
    <div className="user-container">
      <div className="card-header">
        <div className="card-title p-d-lg-flex p-ai-center p-w-100">
          <h3 className="p-mb-3 p-mb-lg-0">Time Sheet</h3>
        </div>
      </div>
      <div>
        <div className="card-body">
          <div className="form-area">
            <div className="dashboard-container p-grid">
              <div className="p-col-6 p-sm-4 p-md-3">
                <div className="dashboard-box p-mb-2">
                  <div className="p-d-flex p-ai-center">
                    <div className="dashboard-icon"></div>
                  </div>
                  <div className="dash-info">
                    Total Attendance
                    <div className="count">{timeSheetList.TotalAttendance}</div>
                  </div>
                </div>
              </div>
              <div className="p-col-6 p-sm-4 p-md-3">
                <div className="dashboard-box p-mb-2">
                  <div className="p-d-flex p-ai-center">
                    <div className="dashboard-icon">
                      <i className="icon-mining"></i>
                    </div>
                  </div>
                  <div className="dash-info">
                    Total Leave
                    <div className="count">{timeSheetList.TotalLeaveDays}</div>
                  </div>
                </div>
              </div>
              <div className="p-col-12 p-sm-6 p-md-3">
                <div className="dashboard-box p-mb-2">
                  <div className="p-d-flex p-ai-center">
                    <div className="dashboard-icon">
                      <i className="icon-project"></i>
                    </div>
                  </div>
                  <div className="dash-info">
                    Over Time
                    <div className="count">{timeSheetList.totalOverTime}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
              <h3>view details</h3>
              <div className="p-grid p-p-0">
                {timeSheetList.formattedDayWiseData?.length ? (
                  timeSheetList.formattedDayWiseData?.map((item, idx) => {
                    return (
                      <div
                        className="p-col-6 p-sm-12 p-md-3"
                        key={idx}
                        // onClick={() => handleViewData(item.Name)}
                      >
                        <div
                          className="card shadow-1 flex flex-column"
                          style={{
                            color: "#29b1d0",
                            borderLeft: "solid",
                            borderLeftWidth: 4,
                          }}
                        >
                          <div className={"p-grid"}>
                            <div className="p-col-6 p-md-6 p-pt-0">
                              <div className="grid mt-3 p-pt-2">
                                <div className="grid mt-3 p-pt-2">
                                  <div className="col-6 flex flex-column p-3 text-center border-right-1 surface-border">
                                    <span
                                      className="dashboard-lable "
                                      style={{ color: "#29b1d0" }}
                                    >
                                      Day :- {item.day}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="grid mt-3 p-pt-2">
                                <div className="col-6 flex flex-column p-3 text-center border-right-1 surface-border">
                                  <span className="text-color text-2xl font-semibold">
                                    OT :- {item.TotalTime}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <span>There are no record!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSheet;
