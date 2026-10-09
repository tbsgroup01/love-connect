
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Notifications = sequelize.define(
  "Notifications",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    recipient_type: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("like", "report", "match", "system", "message"),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reference_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    tableName: "notifications",
    timestamps: true,
    indexes: [
      { fields: ["recipient_type", "user_id", "is_read"] },
      { fields: ["recipient_type", "admin_id", "is_read"] },
    ],
  },
);

export default Notifications;
