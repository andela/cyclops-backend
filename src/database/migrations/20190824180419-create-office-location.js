export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('OfficeLocations', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    address: {
      allowNull: false,
      type: Sequelize.STRING
    },
    city: {
      allowNull: false,
      type: Sequelize.STRING
    },
    state: {
      allowNull: false,
      type: Sequelize.STRING
    },
    country: {
      allowNull: false,
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
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.dropTable('OfficeLocations')
};
