
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('BlackListedTokens', {
    uuid: {
      allowNull: false,
      // autoIncrement: true,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    token: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('BlackListedTokens')
};
