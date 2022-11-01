"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shoplist = void 0;
var database_1 = require("../database");
var sequelize_1 = require("sequelize");
exports.Shoplist = database_1.sequelize.define("shop_lists", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: {
        type: sequelize_1.DataTypes.STRING,
    },
    completed: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: false,
    },
});
