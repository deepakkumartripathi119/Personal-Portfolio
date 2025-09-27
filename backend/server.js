const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();


const path = require('path');

const app = express();
app.use(express.json());
// Allow only deployed frontend URL for CORS
app.use(cors({
  origin: ['https://deepakkumartripathi119.github.io/Personal-Portfolio','https://personal-portfolio-tau-ten-39.vercel.app/'],
  methods: ['GET', 'POST'],
  credentials: false
}));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required.' });
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Contact Form: ${subject || 'No Subject'}`,
    text: `From: ${name || 'Anonymous'} <${email}>\n\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email.', details: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Email service running on port ${PORT}`);
});