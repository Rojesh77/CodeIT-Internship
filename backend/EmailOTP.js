const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 9000;

const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

app.use(bodyParser.json());


// Enable CORS
app.use(cors());

const otps = {};

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  }
});

// Endpoint to send OTP
app.post('/send-otp', (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).send('Email is required');
  }
  // console.log(email)
  
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps[email] = otp;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending OTP');
    }
    res.status(200).send('OTP sent successfully');
    console.log(info.messageId)
  });
});

// Endpoint to validate OTP
app.post('/validate-otp', (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  if (!email || !otp) {
    return res.status(400).send('Email and OTP are required');
  }

  if (otps[email] === otp) {
    delete otps[email]; // OTP is valid, remove it from the store
    return res.status(200).send('OTP is valid');
  } else {
    return res.status(400).send('Invalid OTP');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
