import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class User extends Model {
  static associate(models) {
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'orders',
    });
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;
