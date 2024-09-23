import { Model, DataTypes, Optional } from 'sequelize'; // Import the sequelize library
import sequelize from '../config/db.js'; // Import the connection instance (removed .js for ESM module)
import User from './User.js'; // Import the User model
import Product from './Product.js'; // Import the Product model

// Define Order attributes
interface OrderAttributes {
  id: number;
  status: string;
  total: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Optional attributes for creating a new order (id is auto-generated)
interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

// Define the Order model
class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public status!: string;
  public total!: number;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    // Define associations
    Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    Order.belongsToMany(Product, { through: 'OrderItems', foreignKey: 'orderId', as: 'products' });
  }
}

// Initialize the Order model
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Refers to Users table
        key: 'id',
      },
      onDelete: 'CASCADE', // If a user is deleted, cascade the deletion to the orders
    },
  },
  {
    sequelize,
    tableName: 'orders', // Explicitly define table name (good for consistency)
    timestamps: true, // Add timestamps (createdAt, updatedAt)
  }
);

// Ensure associations are initialized properly after model definition
Order.associate();

export default Order; // Export the Order model
