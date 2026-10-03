import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const Users = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    gender: {
      type: Sequelize.ENUM("male", "female", "other"),
      allowNull: true,
    },
    interest: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    profile_image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM("user"),
      defaultValue: "user",
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("active", "inactive", "suspended"),
      defaultValue: "active",
      allowNull: false,
    },
    last_login: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    reset_otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reset_otp_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  },
);

export default Users;
