import { Model, DataTypes } from 'sequelize';
import sequelize from './index.js'; // Adjust this path if necessary

class User extends Model {
  static associate(models) {
    // define association here
  }
}

User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  isAdmin: DataTypes.BOOLEAN
}, {
  sequelize,
  modelName: 'User',
});

export default User;
