"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objetivo = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Objetivo = connection_1.default.define('objetivo', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_objetivo: {
        type: sequelize_1.DataTypes.STRING
    },
    peso_actual: {
        type: sequelize_1.DataTypes.INTEGER
    },
    peso_objetivo: {
        type: sequelize_1.DataTypes.INTEGER
    },
    username_usuarios: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false,
});
