import dotenv from 'dotenv';
import { Sequelize } from "sequelize";
import User from '../models/User_Model.js';
dotenv.config();
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false,
    }
);

const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión exitosa a la base de datos");
        await User.sync({ alter: true });
        console.log("Tabla 'users' sincronizada correctamente");
    } catch (err) {
        console.error("Error en la conexión a la base de datos:", err);
        process.exit(1); // Detener la aplicación si la conexión falla
    }
};

initDB();

export default sequelize;