import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js';

class User extends Model {
  static associate(models) {
    // Define associations here if needed
  }
}

User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  isAdmin: DataTypes.BOOLEAN,
}, {
  sequelize, // Ensure sequelize instance is passed here
  modelName: 'User',
});

export default User;
