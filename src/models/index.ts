import { Sequelize } from 'sequelize';
import { readdirSync } from 'fs';
import { join } from 'path';
import { sequelize } from '../config/database'; // Updated import path

const models: { [key: string]: any } = {};

// Dynamically import all models in the models directory
readdirSync(__dirname)
  .filter((file) => file !== 'index.ts')
  .forEach((file) => {
    const model = require(join(__dirname, file))(sequelize);
    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize, models };
