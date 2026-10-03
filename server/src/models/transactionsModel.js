import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Transactions = sequelize.define(
  "Transactions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    discount_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    final_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("success", "failed"),
      allowNull: false,
    },

    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "transactions",
    timestamps: true,
  }
);

export default Transactions;