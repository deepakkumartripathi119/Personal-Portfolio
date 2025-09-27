const express = require("express");
const { Resend } = require("resend");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from a .env file for local development
dotenv.config();

const app = express();
// Instantiate Resend with the API key from your environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors());

// --- Static File Serving (for Vercel deployment) ---
// Serve the frontend files from the 'frontend' directory
app.use(express.static(path.join(__dirname, "../frontend")));

// For any route that is not an API route, serve the index.html
app.get(/^(?!\/send-email).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});


// --- API Endpoint for Sending Emails ---
app.post("/send-email", async (req, res) => {
  // Destructure the form data from the request body
  const { name, email, subject, message } = req.body;

  // Basic validation to ensure all fields are present
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Use the Resend SDK to send the email
    const { data, error } = await resend.emails.send({
      // Use Resend's default 'onboarding' address. 
      // To use your own domain, you must verify it first in the Resend dashboard.
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      
      // The destination email address (your personal email) from environment variables
      to: [process.env.MY_PERSONAL_EMAIL],
      
      // The subject of the email you receive will be the user's subject
      subject: subject,
      
      // Set the sender's email as the 'Reply-To' address.
      // This way, when you reply in your email client, it goes directly to the user.
      reply_to: email,
      
      // A simplified HTML body with the message first, then contact details.
      // The .replace() call ensures any line breaks in the user's message are preserved.
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333;">
          <p>${message.replace(/\n/g, "<br>")}</p>
          <br>
          <hr style="border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #777;">
            <strong>From:</strong> ${name}<br>
            <strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
          </p>
        </div>
      `,
    });

    // If the Resend API returns an error, log it and send a 400 response
    if (error) {
      console.error("Resend API Error:", error);
      return res.status(400).json({ error: "Failed to send email.", details: error.message });
    }

    // If successful, send a 200 success response
    res.status(200).json({ success: true, message: "Email sent successfully!" });

  } catch (exception) {
    // Catch any other server-side errors
    console.error("Server-side exception:", exception);
    res.status(500).json({ error: "An internal server error occurred.", details: exception.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

