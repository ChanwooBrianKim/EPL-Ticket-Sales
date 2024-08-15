'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'imgUrl', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'imgUrl');
  }
};
