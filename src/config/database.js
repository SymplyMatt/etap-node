import { Sequelize } from 'sequelize';
import config from './config'; // Adjust the path if necessary

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false, // Set to true if you want to log SQL queries
  }
);

export default sequelize;
