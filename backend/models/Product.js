// Initialize Product model
const { Sequelize } = require("sequelize");

// Export a function that will define the model
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
      }
    }, {});
    
    // Define the model associations
    User.associate = function(models) {
      // associations can be defined here
      User.hasMany(models.Order, {
        foreignKey: 'userId',
        as: 'orders',
      });
    };
  
    return User;
  };
  