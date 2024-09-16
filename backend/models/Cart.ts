import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.js'; // Import the connection instance
import User from './User.js'; // Import the User model

// Define the attributes for the Cart model
interface CartAttributes {
  id: number;
  userId: number;
  items: string; // Storing the cart items as a JSON string
}

// Optional type for creating a new cart (id will be auto-generated)
interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {}

// Define the Cart model class
class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  public id!: number;
  public userId!: number;
  public items!: string; 

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Method to parse items stored as JSON
  public getParsedCartItems(): any[] {
    try {
      return JSON.parse(this.items); // Converts JSON string back to array/object
    } catch (error) {
      console.error('Failed to parse cart items:', error);
      return [];
    }
  }
}

// Initialize the Cart model with the schema
try {
  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: User, // Reference the User model
          key: 'id',
        },
      },
      items: {
        type: DataTypes.TEXT, // Store items as a JSON string
        allowNull: false,
      },
    },
    {
      sequelize, // The Sequelize instance
      tableName: 'carts',
      timestamps: true,
    }
  );
} catch (error) {
  console.error('Error initializing Cart model:', error);
}

// Define association between Cart and User
Cart.belongsTo(User, { foreignKey: 'userId' });

export default Cart;
