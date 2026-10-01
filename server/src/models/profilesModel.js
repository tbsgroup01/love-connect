import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Profiles = sequelize.define(
  "Profiles",
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
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    about_me: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    partner_preferences: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "profiles",
    timestamps: true,
  },
);

export default Profiles;
