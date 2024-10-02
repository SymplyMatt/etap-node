import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import Subject from './Subject'; 
import Student from './Student'; 
import Topic from './Topic'; 

class UserLesson extends Model {
  public id!: string;              
  public student!: string;        
  public topic!: string;           
  public subject!: string;         
  public progress!: number;       
  public status!: 'completed' | 'in-progress' | 'not-started'; 
  public video!: string | null;   
  public completedAt!: Date | null; 
  public createdAt?: Date | null; 
}

UserLesson.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    student: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Student,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    topic: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Topic, 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('completed', 'in-progress'),
      allowNull: false,
    },
    video: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    completedAt: {
      type: DataTypes.DATE,  
      allowNull: true,       
    },
  },
  {
    sequelize,
    modelName: 'UserLesson',
    timestamps: true, 
  }
);

export default UserLesson;
