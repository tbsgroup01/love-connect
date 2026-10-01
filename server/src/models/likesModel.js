import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Likes = sequelize.define(
  "Likes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "likes",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["sender_id", "receiver_id"],
      },
    ],
  },
);

export default Likes;
