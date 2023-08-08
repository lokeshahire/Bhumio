const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const nodemailer = require("nodemailer");
var cors = require("cors");

const app = express();
app.use(bodyParser.json());

app.use(cors());

const jsonData = require("./data.json");

app.get("/", (req, res) => {
  res.send("Welcome");
});

// Function to search records
app.get("/search", (req, res) => {
  const { zip, name, city, state, major } = req.query;

  const matchingRecords = jsonData.Students.filter(
    (student) =>
      student.address.zip === zip ||
      student.Name.includes(name) ||
      student.address.city.includes(city) ||
      student.address.state === state ||
      student.Major.includes(major)
  );

  res.json(matchingRecords);
});

// Function to create PDF
app.post("/create-pdf", async (req, res) => {
  const studentData = req.body;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const form = pdfDoc.getForm();
  const nameField = form.createTextField("name");
  nameField.setText(studentData.Name);

  // ... add more fields here

  const pdfBytes = await pdfDoc.save();

  const pdfFilePath = `./pdfs/${studentData.Name}.pdf`;

  fs.writeFileSync(pdfFilePath, pdfBytes);

  res.json({ message: "PDF created successfully", pdfPath: pdfFilePath });
});

// Function to edit PDF
app.put("/edit-pdf", async (req, res) => {
  const { pdfPath, newText } = req.body;

  const existingPdfBytes = fs.readFileSync(pdfPath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const page = pdfDoc.getPages()[0];

  page.drawText(newText, { x: 100, y: 500 });

  const editedPdfBytes = await pdfDoc.save();

  fs.writeFileSync(pdfPath, editedPdfBytes);

  res.json({ message: "PDF edited successfully", pdfPath });
});

// Function to merge and email PDFs
app.post("/merge-and-email", async (req, res) => {
  const { pdfPaths, recipientEmail } = req.body;

  const mergedPdfDoc = await PDFDocument.create();
  for (const pdfPath of pdfPaths) {
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const [page] = await mergedPdfDoc.copyPages(pdfDoc, [0]);
    mergedPdfDoc.addPage(page);
  }

  const mergedPdfBytes = await mergedPdfDoc.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "iamlokeshahire@gmail.com",
      pass: "ahire",
    },
  });

  const mailOptions = {
    from: "iamlokeshahire@gmail.com",
    to: recipientEmail,
    subject: "Merged PDF",
    attachments: [
      {
        filename: "merged.pdf",
        content: mergedPdfBytes,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error sending email" });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ message: "Email sent successfully" });
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
