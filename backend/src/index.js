import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://www.ignacioconsuegra.com",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

app.use(express.json());
const resend = new Resend(process.env.RESEND_API_KEY);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is working" });
});
app.post("/send-message", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "ignacioandresconsuegradelacruz@gmail.com",
      subject: "Portfolio message",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Email failed" });
    }

    res.json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server email error" });
  }
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 4000}`)
);
