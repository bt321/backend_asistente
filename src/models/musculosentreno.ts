import { DataTypes } from "sequelize";
import sequelize from "../db/connection";


export const MusculosEntreno = sequelize.define('musculosentrenos', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    musculo_desarrollo: {
        type: DataTypes.STRING
    },
    musculo_fuerte: {
        type: DataTypes.STRING
    },
    otros_musculos: {
        type: DataTypes.STRING
    },
    username_usuario: {
        type: DataTypes.STRING
    }
},  {
        createdAt: false,
        updatedAt: false
    });
