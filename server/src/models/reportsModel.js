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
  },
  {
    tableName: "reports",
    timestamps: true,
  },
);

export default Reports;
