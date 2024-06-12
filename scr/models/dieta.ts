import { DataTypes } from "sequelize";
import sequelize from "../db/connection";



export const Dieta = sequelize.define('dieta', {
    id_dieta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_objetivo: {
        type: DataTypes.STRING
    },
    comida1: {
        type: DataTypes.STRING
    },
    comida2: {
        type: DataTypes.STRING
    },
    comida3:{
        type: DataTypes.STRING
    },
    comida4:{
        type: DataTypes.STRING
    },
    comida5:{
        type: DataTypes.STRING
    }


}, {
        createdAt: false,
        updatedAt: false,
}); 