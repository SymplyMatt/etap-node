import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import Admin from './Admin'; 

class Subject extends Model {
  public id!: string; 
  public name!: string;
  public createdBy!: string; 
  public banner!: string; 
}

Subject.init(
  {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value: string) {
        this.setDataValue('name', value.toLowerCase()); 
      },
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
    banner: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
  },
  {
    sequelize,
    modelName: 'Subject',
    timestamps: true, 
  }
);

export default Subject;
