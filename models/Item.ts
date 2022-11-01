import { sequelize } from "../database";
import { DataTypes } from "sequelize";

export const Item = sequelize.define("items", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING(500) },
  category: { type: DataTypes.STRING },
});
