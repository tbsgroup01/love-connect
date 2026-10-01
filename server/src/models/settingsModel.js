import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Settings = sequelize.define(
  "Settings",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    // General Settings
    brandName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    supportMobile: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    supportEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Email Setup
    smtpHost: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    smtpPort: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    smtpSecurity: {
      type: DataTypes.ENUM("SSL", "TLS", "NONE"),
      allowNull: true,
    },
    smtpUsername: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    smtpPassword: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fromDisplayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fromEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    replyToEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Payment Gateway
    razorpayKeyId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    razorpayKeySecret: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "settings",
    timestamps: true,
  },
);

export default Settings;
