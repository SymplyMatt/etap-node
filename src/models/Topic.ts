import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import Admin from './Admin';
import Subject from './Subject'; 

class Topic extends Model {
  public id!: string; 
  public subject!: string; 
  public name!: string;
  public description!: string;
  public banner!: string | null; 
  public video!: string | null; 
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
      type: DataTypes.UUID, 
      allowNull: false,
      references: {
        model: Subject,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    name: {
      type: DataTypes.STRING(255), 
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    banner: {
      type: DataTypes.STRING(255), 
      allowNull: true,
    },
    video: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.UUID, 
      allowNull: false,
      references: {
        model: Admin,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Topic',
    timestamps: true,
  }
);

export default Topic;
