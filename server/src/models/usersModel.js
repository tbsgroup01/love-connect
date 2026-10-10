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
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    google_id: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    role: {
      type: Sequelize.ENUM("user"),
      defaultValue: "user",
      allowNull: false,
    },
    auth_provider: {
      type: Sequelize.STRING,
      defaultValue: "local",
      allowNull: true,
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
