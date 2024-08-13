import { Model, DataTypes } from 'sequelize'; // Import the sequelize library
import sequelize from '../config/db.js'; // Import the connection instance

// Initialize the OrderItem class that extends the Model class
class OrderItem extends Model {
  static associate(models) {
    // Define associations here
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'orderId',
      as: 'order',
    });
    OrderItem.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
    });
  }
}

// Set up the OrderItem table
OrderItem.init({
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  priceAtOrder: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize, // Connect the sequelize instance
  modelName: 'OrderItem', // Set the model name
});

export default OrderItem; // Export the OrderItem model