export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TripDestinations', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    trip_request_uuid: {
      allowNull: false,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'TripRequests',
        key: 'uuid'
      },
    },
    office_location_uuid: {
      allowNull: false,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'OfficeLocations',
        key: 'uuid'
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: 'updated_at'
    }
  }),
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.dropTable('TripDestinations')
};
