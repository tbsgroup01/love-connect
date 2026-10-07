import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Calls = sequelize.define(
  "Calls",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    caller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    call_type: {
      type: DataTypes.ENUM("voice", "video"),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("completed", "missed", "rejected"),
      allowNull: false,
      defaultValue: "missed",
    },

    started_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    ended_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    tableName: "calls",
    timestamps: true,
  }
);

export default Calls;