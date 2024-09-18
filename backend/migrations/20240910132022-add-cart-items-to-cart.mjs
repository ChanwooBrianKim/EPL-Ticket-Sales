import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Users', // Refers to the Users table
          key: 'id',
        },
      },
      cartItems: {
        type: DataTypes.TEXT, // Store items as JSON
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Automatically sets the current timestamp
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), // Updates timestamp when a row changes
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Carts');
  },
};
