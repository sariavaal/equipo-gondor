const mongoose = require('mongoose');
require('dotenv').config();

const { DB_HOST, DB_PORT, DB_NAME } = process.env;
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {

        }

        );
        console.log(`La base de datos ${DB_NAME} se ha conectado exitosamente en: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;