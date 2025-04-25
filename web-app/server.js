// netlify/functions/submit-form.js
const ExcelJS = require('exceljs');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { Readable } = require('stream');

// Configure S3 (where you'll store the Excel file)
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const bucketName = process.env.S3_BUCKET_NAME;
const excelKey = 'contact_submissions.xlsx';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);
    
    let workbook = new ExcelJS.Workbook();
    try {
      const response = await s3Client.send(
        new GetObjectCommand({ Bucket: bucketName, Key: excelKey })
      );
      
      const stream = response.Body;
      if (stream instanceof Readable) {
        await workbook.xlsx.read(stream);
      }
    } catch (error) {
      // File doesn't exist yet, create a new one
      let worksheet = workbook.getWorksheet('Contact Submissions');
        if (!worksheet) {
        worksheet = workbook.addWorksheet('Contact Submissions');
        worksheet.columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Subject', key: 'subject', width: 20 },
            { header: 'Message', key: 'message', width: 50 },
            { header: 'Date', key: 'date', width: 20 }
        ];
        }

    }
    
    // Get the first worksheet
    const worksheet = workbook.getWorksheet(1);
    
    // Add new row
    worksheet.addRow({
      name,
      email,
      subject,
      message,
      date: new Date().toISOString()
    });
    
    // Save back to S3
    const buffer = await workbook.xlsx.writeBuffer();
    
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: excelKey,
        Body: buffer,
        ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Form submitted successfully!' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Failed to save data. Please try again.' }),
    };
  }
};