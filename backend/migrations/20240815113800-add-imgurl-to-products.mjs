import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('Products', 'imgUrl', {
      type: DataTypes.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('Products', 'imgUrl');
  },
};
