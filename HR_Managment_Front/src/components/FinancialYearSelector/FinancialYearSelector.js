// FinancialYearSelector.js
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';

const FinancialYearSelector = ({ selectedValue, onFinancialYearChange }) => {
  const [selectedYear, setSelectedYear] = useState(selectedValue);
  const [financialYears, setFinancialYears] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const startYear = currentMonth >= 4 ? currentYear : currentYear - 1;
    const endYear = startYear + 1;
    const financialYear = `${startYear}-${endYear}`;

    const years = [];
    for (let i = 0; i < 5; i++) {
      const year = startYear - i;
      years.push({ label: `${year}-${year + 1}`, value: `${year}-${year + 1}` });
    }

    setFinancialYears(years);
    setSelectedYear(financialYear);
    onFinancialYearChange(financialYear);
  }, [onFinancialYearChange]);


  const handleYearChange = (e) => {
    setSelectedYear(e.value);
    onFinancialYearChange(e.value);
  };

  return (
    <div>
      <label>Financial Year:</label>
      <Dropdown
        value={selectedYear}
        options={financialYears}
        onChange={handleYearChange}
        placeholder="Select a year"
      />
    </div>
  );
};

export default FinancialYearSelector;