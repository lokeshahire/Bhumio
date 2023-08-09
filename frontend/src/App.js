// import React, { useState } from "react";
// import axios from "axios";
// import jsonData from "./data.json"; // Import jsonData

// function App() {
//   const [searchCriteria, setSearchCriteria] = useState({
//     zip: "",
//     name: "",
//     city: "",
//     state: "",
//     major: "",
//   });

//   const [searchResults, setSearchResults] = useState([]);
//   const [pdfPath, setPdfPath] = useState("");

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/search", {
//         params: {
//           zip: searchCriteria.zip,
//           name: searchCriteria.name,
//           city: searchCriteria.city,
//           state: searchCriteria.state,
//           major: searchCriteria.major,
//         },
//       });
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error("Error searching records:", error);
//     }
//   };

//   const handleCreatePDF = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/create-pdf",
//         jsonData.Students[0]
//       );
//       setPdfPath(response.data.pdfPath);
//       console.log("pdfPath", response.data.pdfPath);
//     } catch (error) {
//       console.error("Error creating PDF:", error);
//     }
//   };

//   const handleEditPDF = async () => {
//     try {
//       const response = await axios.put("http://localhost:3001/edit-pdf", {
//         pdfPath: "./pdfs/John_Doe.pdf", // Path to the PDF you want to edit
//         newText: "Updated text", // Text you want to add
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error editing PDF:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Student Records</h1>
//       <div>
//         <h2>Search Records</h2>
//         <input
//           type="text"
//           placeholder="Zip"
//           value={searchCriteria.zip}
//           onChange={(e) =>
//             setSearchCriteria({ ...searchCriteria, zip: e.target.value })
//           }
//         />
//         <input
//           type="text"
//           placeholder="Name"
//           value={searchCriteria.name}
//           onChange={(e) =>
//             setSearchCriteria({ ...searchCriteria, name: e.target.value })
//           }
//         />
//         {/* Repeat similar input fields for other criteria */}
//         <button onClick={handleSearch}>Search</button>
//         <div>
//           {searchResults.map((student, index) => (
//             <div key={index}>
//               <h3>{student.Name}</h3>
//               <p>Major: {student.Major}</p>
//               <p>
//                 Address: {student.address.address_1}, {student.address.city},{" "}
//                 {student.address.state} {student.address.zip}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div>
//         <div className="App">
//           <button onClick={handleCreatePDF}>Create PDF</button>
//           {pdfPath && (
//             <p>
//               PDF created successfully.{" "}
//               <a href={pdfPath} target="_blank" rel="noopener noreferrer">
//                 Click here to view/download PDF.
//               </a>
//             </p>
//           )}
//         </div>
//       </div>
//       <div>
//         <h2>Edit PDF</h2>
//         <button onClick={handleEditPDF}>Edit PDF</button>
//       </div>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import csvReducer from "./redux/csvSlice";
import CSVImporter from "./components/CSVImporter";
import DataDisplay from "./components/DataDisplay";

const store = configureStore({
  reducer: {
    csv: csvReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <div>
        <CSVImporter />
        <DataDisplay />
      </div>
    </Provider>
  );
}

export default App;
