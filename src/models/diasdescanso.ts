import { DataTypes } from "sequelize";
import sequelize from "../db/connection";


export const DiasDescanso = sequelize.define('diasdescanso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dias_semana: {
        type: DataTypes.STRING
    },
    username_usuario: {
        type: DataTypes.STRING
    }
   // , username_usuarios:{
   //     type: DataTypes.STRING,
   //     allowNull: false, // Make the foreign key non-nullable for data integrity
   //     references: {
   //     model: 'usuarios', // Reference the target table (usuarios)
   //     key: 'username' // Reference the primary key column in 'usuarios' (username)
   // }
   // }
},  {
        createdAt: false,
        updatedAt: false
    });
