export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TripRequests', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    user_uuid: {
      allowNull: false,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'uuid'
      }
    },
    trip_plan: {
      type: Sequelize.ENUM('multiCity', 'singleCity'),
      defaultValue: 'singleCity'
    },
    request_type: {
      type: Sequelize.ENUM('oneWayTrip', 'returnTrip'),
      defaultValue: 'oneWayTrip'
    },
    leaving_from: {
      allowNull: false,
      type: Sequelize.UUID,
    },
    travel_date: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    travel_reasons: {
      type: Sequelize.STRING,
      defaultValue: 'Business Assignment',
    },
    return_date: {
      allowNull: false,
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.ENUM('pending', 'accepted', 'rejected', 'open'),
      defaultValue: 'pending'
    },
    show_profile: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
  down: queryInterface => queryInterface.dropTable('TripRequests')
};
