// server.js
const express = require('express');
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// Path to the Excel file
const excelFilePath = path.join(__dirname, 'contact_submissions.xlsx');

// Initialize Excel file if it doesn't exist
const initializeExcelFile = async () => {
  if (!fs.existsSync(excelFilePath)) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Contact Submissions');
    
    // Add headers
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Subject', key: 'subject', width: 20 },
      { header: 'Message', key: 'message', width: 50 },
      { header: 'Date', key: 'date', width: 20 }
    ];
    
    await workbook.xlsx.writeFile(excelFilePath);
  }
};

// Initialize Excel file on server start
initializeExcelFile();

// Endpoint to handle form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Load existing Excel file
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFilePath);
    
    // Get the worksheet
    const worksheet = workbook.getWorksheet('Contact Submissions');
    
    // Add new row
    worksheet.addRow({
      name,
      email,
      subject,
      message,
      date: new Date().toISOString()
    });
    
    // Save the workbook
    await workbook.xlsx.writeFile(excelFilePath);
    
    res.status(200).json({ success: true, message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error saving data to Excel:', error);
    res.status(500).json({ success: false, message: 'Failed to save data. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});