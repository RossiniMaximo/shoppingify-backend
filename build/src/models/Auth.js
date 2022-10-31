"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const database_1 = require("../database");
const sequelize_1 = require("sequelize");
exports.Auth = database_1.sequelize.define("auths", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: { type: sequelize_1.DataTypes.STRING },
    password: { type: sequelize_1.DataTypes.STRING },
});
