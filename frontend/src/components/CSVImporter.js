import React from "react";
import { useDispatch } from "react-redux";
import { setColumns, setData } from "../redux/csvSlice";
import Papa from "papaparse";

function CSVImporter() {
  const dispatch = useDispatch();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const text = await file.text();

    Papa.parse(text, {
      complete: (result) => {
        const [headerRow, ...dataRows] = result.data;
        dispatch(setColumns(headerRow));
        dispatch(setData(dataRows));
      },
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
}

export default CSVImporter;
