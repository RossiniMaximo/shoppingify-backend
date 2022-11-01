"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const database_1 = require("../database");
const sequelize_1 = require("sequelize");
exports.Item = database_1.sequelize.define("items", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: { type: sequelize_1.DataTypes.STRING },
    img: { type: sequelize_1.DataTypes.STRING },
    description: { type: sequelize_1.DataTypes.STRING(500) },
    category: { type: sequelize_1.DataTypes.STRING },
});
