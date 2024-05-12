"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('asistentenut', 'root', 'tahtah', {
    host: '150.214.223.70',
    dialect: 'mysql',
});
exports.default = sequelize;
