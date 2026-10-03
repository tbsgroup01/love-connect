import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Activities = sequelize.define(
  "Activities",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
    },
    action: {
      type: DataTypes.ENUM("LOGIN", "LOGOUT"),
      allowNull: false,
    },
    loginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    logoutAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "activities",
    timestamps: true,
  },
);

export default Activities;
