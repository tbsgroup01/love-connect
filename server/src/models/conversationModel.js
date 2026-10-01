import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Conversation = sequelize.define(
  "Conversation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    match_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    user_one_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_two_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lastMessageAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "conversations",
    timestamps: true,
  },
);

export default Conversation;
