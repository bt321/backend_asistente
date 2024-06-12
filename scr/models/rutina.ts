import { DataTypes } from "sequelize";
import sequelize from "../db/connection";



export const Rutina = sequelize.define('rutina', {
    rutina_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username_usuario: {
        type: DataTypes.STRING
    },
    rutina_dia: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    dias_semana:{
        type: DataTypes.STRING
    }}, {
        createdAt: false,
        updatedAt: false,
}); 