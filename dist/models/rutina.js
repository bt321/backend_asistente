"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rutina = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Rutina = connection_1.default.define('rutina', {
    rutina_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username_usuario: {
        type: sequelize_1.DataTypes.STRING
    },
    rutina_dia: {
        type: sequelize_1.DataTypes.STRING
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    dias_semana: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false,
});
