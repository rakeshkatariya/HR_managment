/* eslint-disable no-unused-vars */
import React, {useCallback, useState, useEffect } from "react";
import { Button } from "primereact/button";
import CommonConfig from "../../utils/constant";
import DraftsIcon from "@mui/icons-material/Drafts";
import PreviewIcon from "@mui/icons-material/Preview";
import { useHistory } from "react-router-dom";
import FinancialYearSelector from "../FinancialYearSelector/FinancialYearSelector";

const PaySlip = () => {
  const [holidayId, setHolidayId] = useState(null);
  const [securityUserID, setSecurityUserID] = useState(null);
  const [financialYear, setFinancialYear] = useState();
  const history = useHistory();
  const [paySlipList, setPaySlipList] = useState([
    { lable: "January 2023", Amount: "25000", value: 1 },
    { lable: "February 2023", Amount: "25000", value: 2 },
    { lable: "March 2023", Amount: "25000", value: 3 },
    { lable: "April 2023", Amount: "25000", value: 4 },
    { lable: "May 2023", Amount: "25000", value: 5 },
    { lable: "June 2023", Amount: "25000", value: 6 },
    { lable: "July 2023", Amount: "25000", value: 7 },
    { lable: "August 2023", Amount: "25000", value: 8 },
    { lable: "September 2023", Amount: "25000", value: 9 },
    { lable: "October 2023", Amount: "25000", value: 10 },
    { lable: "November 2023", Amount: "25000", value: 11 },
    { lable: "December 2023", Amount: "25000", value: 12 },
    { lable: "January 2024", Amount: "25000", value: 13 },
    { lable: "February 2024", Amount: "25000", value: 14 },
    { lable: "March 2024", Amount: "25000", value: 15 },
    { lable: "April 2024", Amount: "25000", value: 16 },
    { lable: "May 2024", Amount: "25000", value: 17 },
  ]);

  useEffect(() => {
    const loginData = CommonConfig.loginData();
    // setSecurityUserID(loginData?.UserId);
  }, []);

  const handleDownload = (monthValue) => {
    // Handle download logic here
    console.log(`Downloading payslip for month value: ${monthValue}`);
  };

  const handleFinancialYearChange = useCallback((year) => {
    setFinancialYear(year);
  }, []);

  return (
    <div className="user-container">
      <div className="card-header">
        <div className="card-title p-d-lg-flex p-ai-center p-w-100">
          <h3 className="p-mb-3 p-mb-lg-0">Pay Slip</h3>
          <div className="p-ml-auto p-d-lg-flex p-ai-center">
            <div className="custom-inputs">
              {/* <label htmlFor="financialYear">Financial Year: </label> */}
              {/* <Calendar id="financialYear" value={financialYear} onChange={(e) => handleFinancialYearChange(e)} selectionMode="range" readOnlyInput dateFormat="yy" view="year" /> */}
              <FinancialYearSelector
                selectedValue={financialYear}
                onFinancialYearChange={handleFinancialYearChange}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="card-body">
        <div className="p-col-12 p-grid p-p-0 p-md-12">
          {paySlipList?.length ? (
            paySlipList?.map((item, idx) => {
              return (
                <div className="p-col-6 p-sm-6 p-md-4" key={idx}>
                  <div
                    className="card shadow-1 flex flex-column"
                    style={{
                      color: "rgb(110 225 231)",
                      borderLeft: "solid",
                      borderLeftWidth: 4,
                      position: "relative",
                    }}
                  >
                    <div className="p-grid p-col-12 p-pt-0">
                      <div className="p-col-0 p-md-4 p-pt-0">
                        <div className="grid mt-3 absolute">
                          <span
                            className="dashboard-lable h3"
                            style={{ color: "#29b1d0" }}
                          >
                            {item.lable}
                          </span>
                        </div>
                      </div>
                      <div className="p-grid p-pt-0 p-sm-6 p-md-4">
                        <div className="p-col-6 p-md-6 p-pt-0">
                          <div className="grid mt-3 absolute left-0">
                            <Button
                              onClick={() => history.push("/view-pay-slip")}
                              className="p-button-rounded p-button-outlined p-button-secondary"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <PreviewIcon className="" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-col-6 p-md-6 p-pt-0">
                          <div className="grid mt-3 absolute left-0">
                            <Button
                              icon="pi pi-download"
                              onClick={() => handleDownload(item.value)}
                              className="p-button-rounded p-button-outlined p-button-secondary"
                            />
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
              <span>There are no records!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaySlip;
