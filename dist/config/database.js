"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'your_database_name', process.env.DB_USERNAME || 'your_postgres_username', process.env.DB_PASSWORD || 'your_postgres_password', {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
});
exports.sequelize
    .authenticate()
    .then(() => {
    console.log('Database connection established.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
