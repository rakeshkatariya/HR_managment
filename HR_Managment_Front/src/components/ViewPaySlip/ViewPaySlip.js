import React from "react";
import { Chart } from "primereact/chart";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";

const ViewPaySlip = () => {
  const history = useHistory();
  const chartData = {
    labels: ["Basic Pay", "Allowances", "Deductions"],
    datasets: [
      {
        data: [3000, 1500, 500],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  };

  // Dummy pay details
  const payDetails = [
    { title: "Basic Pay", amount: "$3000" },
    { title: "Allowances", amount: "$1500" },
    { title: "Deductions", amount: "$500" },
  ];

  return (
    <div className="user-container">
      <div className="card-header">
        <div className="card-title p-d-lg-flex p-ai-center p-w-100">
          <h3 className="p-mb-3 p-mb-lg-0">Pay Slip</h3>
          <div className="p-ml-auto p-d-lg-flex p-ai-center"></div>
        </div>
      </div>
      <div style={{ maxWidth: "400px", margin: "auto" }}>
        <Chart type="doughnut" data={chartData} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Pay Details</h3>
        <ul>
          {payDetails.map((item, index) => (
            <li key={index}>
              <strong>{item.title}: </strong>
              {item.amount}
            </li>
          ))}
        </ul>
      </div>
      <div className="dialog-footer">
        <Button
          className="btn-dialog-cancel"
          onClick={() => history.push("/pay-slip")}
        >
          GO BACK
        </Button>
      </div>
    </div>
  );
};

export default ViewPaySlip;
