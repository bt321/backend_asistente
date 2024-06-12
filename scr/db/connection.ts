import { Sequelize } from "sequelize"

const sequelize = new Sequelize('asistente', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});
export default sequelize;