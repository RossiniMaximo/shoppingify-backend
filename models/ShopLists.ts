import { sequelize } from "../database";
import { DataTypes } from "sequelize";

export const Shoplist = sequelize.define("shop_lists", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: {
    type: DataTypes.STRING,
  },
  completed: {
    type: DataTypes.STRING,
    defaultValue: false,
  },
});
