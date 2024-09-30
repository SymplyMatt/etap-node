import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Admin extends Model {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public role!: string;
}

Admin.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM('admin', 'teacher'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Admin',
  }
);

export default Admin;
