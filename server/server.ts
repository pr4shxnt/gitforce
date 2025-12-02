import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import connectToDatabase from "./services/database.service";

const app = express();
const PORT = 3000;

// Middleware
dotenv.config();
app.use(cors());
app.use(express.json());


//Services
connectToDatabase();


// Routes
app.get("/", (req, res) => {
  res.send("Hello Git Force with ESM + TS!");
});

// Example API
app.get("/api/status", (req, res) => {
  res.json({ status: "ok", message: "Server running successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
