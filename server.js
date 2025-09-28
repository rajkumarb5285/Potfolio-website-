// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ====== Middleware ======
app.use(cors());
app.use(express.json()); // parse JSON bodies

// ====== Contact form endpoint ======
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Configure transporter (use your Gmail or SMTP provider)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'rajkumarb5825@gmail.com', // replace with your Gmail
        pass: 'mzau pxrj pnzi rinj' // generate app password from Google
      }
    });

    // Email content
    const mailOptions = {
      from: email,
      to: 'rajkumarb5825@gmail.com', // where you receive emails
      subject: `Portfolio Contact: ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});

// ====== Start server ======
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
