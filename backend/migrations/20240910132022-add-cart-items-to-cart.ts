import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

export async function up(queryInterface: QueryInterface, sequelize: Sequelize) {
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
      onDelete: 'CASCADE', // If the user is deleted, delete their cart
    },
    cartItems: {
      type: DataTypes.TEXT, // Store items as JSON
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Use sequelize.literal for timestamp
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), // Updates timestamp on row change
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('Carts');
}
