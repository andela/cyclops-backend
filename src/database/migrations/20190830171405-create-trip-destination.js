export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TripDestinations', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    trip_uuid: {
      type: Sequelize.UUID,
      references: {
        model: 'TripRequests',
        key: 'uuid',
        as: 'trip',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    office_location_uuid: {
      type: Sequelize.UUID,
      references: {
        model: 'OfficeLocations',
        key: 'uuid',
        as: 'office_location',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    accommodation_uuid: {
      type: Sequelize.UUID
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
  down: queryInterface => queryInterface.dropTable('TripDestinations')
};
