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
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Dashboard = () => {
  const [securityUserID, setSecurityUserID] = useState(null);
  const [dashboardList, setDashboardList] = useState([
    {
      Name: "Announcement",
      Count: 0,
      Icon: "pi pi-bell",
    },
    {
      Name: "Total Leave",
      Count: 0,
      Icon: "pi pi-calendar",
    },
    {
      Name: "Your Salary",
      Count: 0,
      Icon: "pi pi-money-bill",
    },
    {
      Name: "Bonus",
      Count: 0,
      Icon: "pi pi-gift",
    },
    {
      Name: "Penalty",
      Count: 0,
      Icon: "pi pi-exclamation-triangle",
    },
    {
      Name: "Birthday",
      Count: CommonConfig.loginData().BirthDate,
      Icon: "pi pi-calendar-plus",
    },
  ]);

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const loginData = CommonConfig.loginData();
    setSecurityUserID(loginData?.UserId);
  }, []);

  return (
    <div className="user-container">
      <div className="card-header">
        <div className="card-title p-d-lg-flex p-ai-center p-w-100">
          <h3 className="p-mb-3 p-mb-lg-0">Dashboard</h3>
          <div className="p-ml-auto p-d-lg-flex p-ai-center">
            <div className="custom-inputs">
              {/* <label htmlFor="financialYear">Financial Year: </label> */}
              {/* <Calendar id="financialYear" value={financialYear} onChange={(e) => handleFinancialYearChange(e)} selectionMode="range" readOnlyInput dateFormat="yy" view="year" /> */}
              {/* <FinancialYearSelector
                selectedValue={financialYear}
                onFinancialYearChange={handleFinancialYearChange}
              /> */}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="card-body">
        <div className="p-grid p-p-0">
          {dashboardList?.length ? (
            dashboardList?.map((item, idx) => {
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
                          <div className="col-6 flex flex-column p-3 text-center border-right-1 surface-border">
                            <i
                              className={`layout-menuitem-icon ${item.Icon}`}
                              style={{ color: "#29b1d0", marginRight: 5 }}
                            ></i>
                          </div>
                          <div className="grid mt-3 p-pt-2">
                            <div className="col-6 flex flex-column p-3 text-center border-right-1 surface-border">
                              <span
                                className="dashboard-lable "
                                style={{ color: "#29b1d0" }}
                              >
                                {item.Name}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="grid mt-3 p-pt-2">
                          <div className="col-6 flex flex-column p-3 text-center border-right-1 surface-border">
                            <span className="text-color text-2xl font-semibold">
                              {item.Count}
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
      {/* <Box sx={{ width: 400 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Box> */}
    </div>
  );
};
export default Dashboard;
