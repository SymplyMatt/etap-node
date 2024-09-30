import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import Subject from './Subject';
import Admin from './Admin';

class Topic extends Model {
  public id!: string;
  public subject!: string;
  public name!: string;
  public description!: string;
  public banner!: string;
  public video!: string;
  public createdBy!: string;
  public duration!: number;
}

Topic.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Subject,
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    banner: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Admin,
        key: 'id',
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Topic',
  }
);

export default Topic;
