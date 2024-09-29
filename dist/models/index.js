"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = exports.sequelize = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const database_1 = require("../config/database"); // Updated import path
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return database_1.sequelize; } });
const models = {};
exports.models = models;
// Dynamically import all models in the models directory
(0, fs_1.readdirSync)(__dirname)
    .filter((file) => file !== 'index.ts')
    .forEach((file) => {
    const model = require((0, path_1.join)(__dirname, file))(database_1.sequelize);
    models[model.name] = model;
});
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});
