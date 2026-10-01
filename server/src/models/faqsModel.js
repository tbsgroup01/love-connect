import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Faqs = sequelize.define(
  "faqs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    faq_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
      allowNull: false,
    },
  },
  {
    tableName: "faqs",
    timestamps: true,
  },
);

export default Faqs;
