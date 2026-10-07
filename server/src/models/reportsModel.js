import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Reports = sequelize.define(
  "Reports",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    reporter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reported_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in_review", "resolved", "dismissed", "action_taken"),
      defaultValue: "pending",
      allowNull: false,
    },
    action_taken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "reports",
    timestamps: true,
  },
);

export default Reports;
