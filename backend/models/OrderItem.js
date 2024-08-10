module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      priceAtOrder: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    }, {});
  
    OrderItem.associate = function(models) {
      // associations can be defined here
      OrderItem.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order',
      });
      OrderItem.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });
    };
  
    return OrderItem;
  };
  