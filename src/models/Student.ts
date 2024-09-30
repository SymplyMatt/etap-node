import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Student extends Model {
  public id!: string; 
  public firstName!: string;
  public lastName!: string;
  public email!: string;
}

Student.init(
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
  },
  {
    sequelize,
    modelName: 'Student',
  }
);

export default Student;
