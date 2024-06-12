"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusculosEntreno = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.MusculosEntreno = connection_1.default.define('musculosentrenos', {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    musculo_desarrollo: {
        type: sequelize_1.DataTypes.STRING
    },
    musculo_fuerte: {
        type: sequelize_1.DataTypes.STRING
    },
    otros_musculos: {
        type: sequelize_1.DataTypes.STRING
    },
    username_usuario: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false
});
