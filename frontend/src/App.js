import React, { useState } from "react";
import axios from "axios";

function App() {
  const [searchCriteria, setSearchCriteria] = useState({
    zip: "",
    name: "",
    city: "",
    state: "",
    major: "",
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:3001/search", {
        params: searchCriteria,
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching records:", error);
    }
  };

  const handleCreatePDF = async () => {
    try {
      const response = await axios.post("http://localhost:3001/create-pdf", {
        Name: "John Doe", // Sample student data
        Major: "Computer Science", // Sample student data
        address: {
          state: "CA", // Sample student data
          zip: "12345", // Sample student data
          address_1: "123 Main St", // Sample student data
          address_2: "Apt 456", // Sample student data
          city: "Sample City", // Sample student data
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error creating PDF:", error);
    }
  };

  const handleEditPDF = async () => {
    try {
      const response = await axios.put("http://localhost:3001/edit-pdf", {
        pdfPath: "./pdfs/John Doe.pdf", // Path to the PDF you want to edit
        newText: "Updated text", // Text you want to add
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error editing PDF:", error);
    }
  };

  return (
    <div>
      <h1>Student Records</h1>
      <div>
        <h2>Search Records</h2>
        <input
          type="text"
          placeholder="Name"
          value={searchCriteria.name}
          onChange={(e) =>
            setSearchCriteria({ ...searchCriteria, name: e.target.value })
          }
        />
        {/* Repeat similar input fields for other criteria */}
        <button onClick={handleSearch}>Search</button>
        <div>
          {searchResults.map((student, index) => (
            <div key={index}>
              <h3>{student.Name}</h3>
              <p>Major: {student.Major}</p>
              <p>
                Address: {student.address.address_1}, {student.address.city},{" "}
                {student.address.state} {student.address.zip}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Create PDF</h2>
        <button onClick={handleCreatePDF}>Create PDF</button>
      </div>
      <div>
        <h2>Edit PDF</h2>
        <button onClick={handleEditPDF}>Edit PDF</button>
      </div>
    </div>
  );
}

export default App;
