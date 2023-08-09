import React, { useState } from "react";
import { useSelector } from "react-redux";

function DataDisplay() {
  const columns = useSelector((state) => state.csv.columns);
  const data = useSelector((state) => state.csv.data);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    const lowercasedValue = value.toLowerCase();
    const filteredRows = data.filter((row) => {
      return columns.some((column) => {
        const cellValue = row[columns.indexOf(column)].toLowerCase();
        return cellValue.includes(lowercasedValue);
      });
    });

    setFilteredData(filteredRows);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataDisplay;
