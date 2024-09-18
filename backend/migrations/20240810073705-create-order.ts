import { DataTypes, QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('Orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    orderStatus: {
      type: DataTypes.ENUM('Pending', 'Shipped', 'Delivered'),
      defaultValue: 'Pending',
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Set current timestamp by default
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Set current timestamp by default and update on change
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('Orders');
}
