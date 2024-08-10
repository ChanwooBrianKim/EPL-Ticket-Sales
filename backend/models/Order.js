module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      orderStatus: {
        type: DataTypes.ENUM,
        values: ['Pending', 'Shipped', 'Delivered'],
        defaultValue: 'Pending',
      }
    }, {});
  
    Order.associate = function(models) {
      // associations can be defined here
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      Order.hasMany(models.OrderItem, {
        foreignKey: 'orderId',
        as: 'orderItems',
      });
    };
  
    return Order;
  };
  