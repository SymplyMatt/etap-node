'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('UserLessons', 'completedAt', {
      type: Sequelize.DATE,
      allowNull: true, // Set to true so it's optional until a lesson is completed
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('UserLessons', 'completedAt');
  },
};
