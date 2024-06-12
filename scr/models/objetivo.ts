import { DataTypes } from "sequelize";
import sequelize from "../db/connection";



export const Objetivo = sequelize.define('objetivo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_objetivo: {
        type: DataTypes.STRING
    },
    peso_actual: {
        type: DataTypes.INTEGER
    },
    peso_objetivo:{
        type: DataTypes.INTEGER
    },
    username_usuarios: {
        type: DataTypes.STRING
    }

},  {
        createdAt: false,
        updatedAt: false,
        
    
    }); 