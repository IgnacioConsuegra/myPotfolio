import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { Resend } from "resend";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://www.ignacioconsuegra.com"],
    credentials: true,
  })
);

app.use(express.json());
const resend = new Resend(process.env.RESEND_API_KEY);
app.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  try {
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
try {
  const buildPath = path.join(__dirname, "../../frontend/dist");

  app.use(express.static(buildPath));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
} catch (err) {}
app.listen(process.env.PORT || 4000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 4000}`)
);
