import { DataTypes } from "sequelize";
import db from "../db/connection";


export const User = db.define('usuarios', {
    username:{
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING
    },
    apellidos:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    genero:{
        type: DataTypes.STRING
    },
    altura:{
        type: DataTypes.INTEGER
    },
    nivel_experiencia:{
        type: DataTypes.STRING
    }
},  { 
        createdAt: false, 
        updatedAt: false,
         
    });  