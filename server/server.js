import express from "express";
import cors from "cors";
import "dotenv/config";
import sequelize from "./src/config/db.js";
import morgan from "morgan";
import authRoutes from "./src/routes/authRoutes.js";
import bannersRoutes from "./src/routes/bannersRoutes.js";
import faqsRoutes from "./src/routes/faqsRoutes.js";
import plansRoutes from "./src/routes/plansRoutes.js";
import reportsRoutes from "./src/routes/reportsRoutes.js";
import activitiesRoutes from "./src/routes/activitiesRoutes.js";
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.send("LoveConnect Database is running successfully");
});

app.use("/api/auth", authRoutes);
app.use("/api/banners", bannersRoutes);
app.use("/api/faqs", faqsRoutes);
app.use("/api/plans", plansRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/activities", activitiesRoutes);
const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log("MySQL database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

startServer();
