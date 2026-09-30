import express from "express";
import "dotenv/config";
import sequelize from "./src/config/db.js";
import morgan from "morgan";
import adminRoutes from "./src/routes/adminRoutes.js";
import usersRoutes from "./src/routes/usersRoutes.js";

const app = express();
const PORT = process.env.PORT;
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.send("LoveConnect Database is running successfully");
});

app.use("/api/admin", adminRoutes);
app.use("/api/users", usersRoutes);

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
