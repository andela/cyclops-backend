export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('OfficeLocations', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    address: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.dropTable('OfficeLocations')
};
