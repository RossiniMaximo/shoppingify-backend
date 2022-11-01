import { sequelize } from "../../database";
import { DataTypes } from "sequelize";

export const User = sequelize.define("users", {
  fullname: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
