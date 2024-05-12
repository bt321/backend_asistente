import { Sequelize } from "sequelize"

const sequelize = new Sequelize('asistentenut', 'root', 'tahtah', {
    host: '150.214.223.70',
    dialect: 'mysql',
});
export default sequelize;
 