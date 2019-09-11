export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Rooms', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    accommodation_location_uuid: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'AccommodationLocations',
        key: 'uuid',
        as: 'rooms'
      },
    },
    room_name: {
      type: Sequelize.STRING,
    },
    room_type: {
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
  down: queryInterface => queryInterface.dropTable('Rooms')
};
