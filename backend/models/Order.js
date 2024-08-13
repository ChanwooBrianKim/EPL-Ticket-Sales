import { Model, DataTypes } from 'sequelize'; // Import the sequelize library
import sequelize from '../config/db'; // Import the connection instance
import User from './User'; // Import the User model
import Product from './Product'; // Import the Product model

class Order extends Model {} // Initialize the Order class that extends the Model class

// Set up the Order table
Order.init({
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending', // Example statuses: pending, completed, canceled
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize, // Connect the sequelize instance
  modelName: 'Order', // Set the model name
}); 

// Associations
Order.associate = function(models) {
  Order.belongsTo(User, { foreignKey: 'userId' }); // A user can have many orders
  Order.belongsToMany(Product, { through: 'OrderItems', foreignKey: 'orderId' }); // An order can have many products
};

export default Order; // Export the Order model