import { Model, DataTypes } from 'sequelize'; // Import the sequelize library
import sequelize from '../config/db'; // Import the connection instance

// Define the attributes for the OrderItem model
interface OrderItemAttributes {
  id: number;
  quantity: number;
  priceAtOrder: number;
  orderId?: number;
  productId?: number;
}

class OrderItem extends Model<OrderItemAttributes> implements OrderItemAttributes {
  public id!: number;
  public quantity!: number;
  public priceAtOrder!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
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
OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceAtOrder: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize, // Connect the sequelize instance
    modelName: 'OrderItem', // Set the model name
  }
);

export default OrderItem; // Export the OrderItem model
