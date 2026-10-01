import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Matches = sequelize.define(
  "Matches",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_one_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_two_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    matched_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "matches",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["user_one_id", "user_two_id"],
      },
    ],
  },
);

export default Matches;
