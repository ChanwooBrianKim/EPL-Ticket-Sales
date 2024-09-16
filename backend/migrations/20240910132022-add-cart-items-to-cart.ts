import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export async function up(queryInterface: QueryInterface, Sequelize: Sequelize) {
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
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('Carts');
}
