import { Model, DataTypes, Optional } from 'sequelize'; // Import the sequelize library
import sequelize from '../config/db.js'; // Import the connection instance
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

// Optional attributes for creating a new order
interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public status!: string;
  public total!: number;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    Order.belongsTo(User, { foreignKey: 'userId' });
    Order.belongsToMany(Product, { through: 'OrderItems', foreignKey: 'orderId' });
  }
}

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
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Order',
  }
);

export default Order; // Export the Order model