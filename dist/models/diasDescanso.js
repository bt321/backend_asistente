"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiasDescanso = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.DiasDescanso = connection_1.default.define('diasdescanso', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dias_semana: {
        type: sequelize_1.DataTypes.STRING
    },
    username_usuario: {
        type: sequelize_1.DataTypes.STRING
    }
    // , username_usuarios:{
    //     type: DataTypes.STRING,
    //     allowNull: false, // Make the foreign key non-nullable for data integrity
    //     references: {
    //     model: 'usuarios', // Reference the target table (usuarios)
    //     key: 'username' // Reference the primary key column in 'usuarios' (username)
    // }
    // }
}, {
    createdAt: false,
    updatedAt: false
});
