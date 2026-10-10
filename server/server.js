import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import "dotenv/config";
import sequelize from "./src/config/db.js";
import morgan from "morgan";
import authRoutes from "./src/routes/authRoutes.js";
import bannersRoutes from "./src/routes/bannersRoutes.js";
import faqsRoutes from "./src/routes/faqsRoutes.js";
import plansRoutes from "./src/routes/plansRoutes.js";
import reportsRoutes from "./src/routes/reportsRoutes.js";
import activitiesRoutes from "./src/routes/activitiesRoutes.js";
import usersRoutes from "./src/routes/usersRoutes.js";
import supportRoutes from "./src/routes/supportRoutes.js";
import paymentRoutes from "./src/routes/paymentsRoutes.js";      
import subscriptionsRoutes from "./src/routes/subscriptionsRoutes.js";
import settingsRoutes from "./src/routes/settingsRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import likesRoutes from "./src/routes/likesRoutes.js";
import matchesRoutes from "./src/routes/matchesRoutes.js";
import chatsRoutes from "./src/routes/chatsRoutes.js";
import callsRoutes from "./src/routes/callsRoutes.js";
import notificationsRoutes from "./src/routes/notificationsRoutes.js";
import { initializeSocket } from "./src/config/socket.js";

import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT;
const corsOptionsDelegate = (req, callback) => {
    const origin = req.headers.origin;
    const corsOptions = {
        origin: origin || "*",
        credentials: Boolean(origin),
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
        allowedHeaders: req.headers["access-control-request-headers"] || [
            "Origin",
            "X-Requested-With",
            "Content-Type",
            "Accept",
            "Authorization",
            "X-Custom-Header",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers",
        ],
        exposedHeaders: [
            "Authorization",
            "Content-Disposition",
            "Content-Length",
            "X-Total-Count",
        ],
        optionsSuccessStatus: 200,
        preflightContinue: false,
    };
    callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(uploadsDir));

app.get("/test", (req, res) => {

  res.send("LoveConnect Database is running successfully");
});

app.use("/api/auth", authRoutes);
app.use("/api/banners", bannersRoutes);
app.use("/api/faqs", faqsRoutes);
app.use("/api/plans", plansRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/subscriptions", subscriptionsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/matches", matchesRoutes);
app.use("/api/chats", chatsRoutes);
app.use("/api/calls", callsRoutes);
app.use("/api/notifications", notificationsRoutes);


const server = http.createServer(app);
initializeSocket(server);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: false });
    console.log("MySQL database connected successfully");

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

startServer();
