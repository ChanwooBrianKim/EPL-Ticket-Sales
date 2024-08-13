import { Model, DataTypes } from 'sequelize'; // Import the sequelize library
import sequelize from '../config/db.js'; // Import the connection instance

class Product extends Model {} // Initialize the Product class that extends the Model class

// Set up the Product table
Product.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize, // Connect the sequelize instance
  modelName: 'Product', // Set the model name
});

export default Product; // Export the Product model