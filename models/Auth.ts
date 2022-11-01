import { sequelize } from "../../database";
import { DataTypes } from "sequelize";

export const Auth = sequelize.define("auths", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});
