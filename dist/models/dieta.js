"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dieta = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Dieta = connection_1.default.define('dieta', {
    id_dieta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_objetivo: {
        type: sequelize_1.DataTypes.STRING
    },
    comida1: {
        type: sequelize_1.DataTypes.STRING
    },
    comida2: {
        type: sequelize_1.DataTypes.STRING
    },
    comida3: {
        type: sequelize_1.DataTypes.STRING
    },
    comida4: {
        type: sequelize_1.DataTypes.STRING
    },
    comida5: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false,
});
