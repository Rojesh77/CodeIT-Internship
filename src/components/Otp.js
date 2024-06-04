const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 8000;

// Enable CORS
app.use(cors());

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a transporter
let transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

app.post('/sendEmail', upload.single('file'), (req, res) => {
  const { email } = req.body;
  // const email = 'lrbrbs100@gmail.com'
  // const email = req.email ;
  const file = req.file;

  if (!file) {
    return res.status(400).send('Missing file');
  }

  let mailOptions = {
    from: "Sender Name" <${process.env.EMAIL}>,
    to: 'lrbrbs100@gmail.com',
    subject: EMAIL of the qualified Examineer ${email},
    html: <p>EMAIL of the qualified Examineer is :  ${email} <br>And here is his CV : </p><img src="cid:unique@nodemailer.com"/>,
    // html : Here is your file ${file},
    attachments: [
      {
        filename: file.originalname,
        content: file.buffer,
        cid: 'unique@nodemailer.com'
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }
    console.log('Message sent: %s', info.messageId);
    res.send('Email sent successfully');
  });
});

app.listen(port, () => {
  console.log(Server is running on http://localhost:${port});
});