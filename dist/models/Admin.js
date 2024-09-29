"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Admin extends sequelize_1.Model {
}
Admin.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('admin', 'teacher'),
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Admin',
});
exports.default = Admin;
