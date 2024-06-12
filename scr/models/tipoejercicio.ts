import { DataTypes } from "sequelize";
import db from "../db/connection";


export const TipoEjercicio = db.define('tiposejercicio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipoEjercicio:{
        type: DataTypes.STRING
    },
    username_usuario: {
        type: DataTypes.STRING
    }

    },  {
        createdAt: false,
        updatedAt: false,
        
    }); 