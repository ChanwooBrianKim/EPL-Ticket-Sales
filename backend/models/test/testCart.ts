// import { DataTypes, Model, Optional } from 'sequelize';
// import sequelize from '../config/db'; // Import the connection instance
// import User from './User'; // Import the User model (omit .js in TypeScript)

// // Define the attributes for the Cart model
// interface CartAttributes {
//   id: number;
//   userId: number;
//   cartItems: string; // Storing the cart items as a JSON string
// }

// // Optional type for creating a new cart (id will be auto-generated)
// interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {}

// // Define the Cart model class
// class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
//   public id!: number;
//   public userId!: number;
//   public cartItems!: string; // JSON string to store cart items

//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;

//   public getParsedCartItems(): any[] {
//     return JSON.parse(this.cartItems); // Converts JSON string back to array/object
//   }
// }

// // Initialize the Cart model with the schema
// Cart.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     userId: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false,
//       references: {
//         model: User, // Reference the User model
//         key: 'id',
//       },
//     },
//     cartItems: {
//       type: DataTypes.TEXT, // Store items as a JSON string
//       allowNull: false,
//       defaultValue: '[]', // Default to an empty array
//     },
//   },
//   {
//     sequelize, // The Sequelize instance
//     tableName: 'carts',
//     timestamps: true,
//   }
// );

// // Define association between Cart and User
// Cart.belongsTo(User, { foreignKey: 'userId' });

// export default Cart;
