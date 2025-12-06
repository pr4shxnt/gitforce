import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import connectToDatabase from "./services/database.service.js";
import adminRoutes from "./routes/admin.routes.js";
import messageRoutes from "./routes/message.routes.js";
import projectRoutes from "./routes/project.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";
import teamRoutes from "./routes/team.routes.js";
import contentRoutes from "./routes/content.routes.js";
import memberRoutes from "./routes/member.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import { initializeSocketIO } from "./services/socket.handler.js";
import { initializeCleanupService } from "./services/cleanup.service.js";
import './services/cloudinary.service.js'; // Initialize services

const app = express();
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);

// Initialize Socket.IO with CORS
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
dotenv.config();
app.use(cors());
app.use(express.json());

// Services
connectToDatabase();
initializeSocketIO(io);
initializeCleanupService();

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Hello Git Force");
});

// Example API
app.get("/api/status", (req, res) => {
  res.json({ status: "ok", message: "Server running successfully" });
});

// Start server with Socket.IO only if not in Vercel environment (Vercel handles the server)
if (process.env.NODE_ENV !== 'production') {
  httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`WebSocket server ready`);
  });
}

export default app;
