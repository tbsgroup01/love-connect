import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Banners = sequelize.define(
  "Banners",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    desktopImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    headline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tagline: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ctaLabel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    tableName: "banners",
    timestamps: true,
  },
);

export default Banners;
