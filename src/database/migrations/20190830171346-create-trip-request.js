export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TripRequests', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    user_uuid: {
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'uuid',
        as: 'user',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    leaving_from: {
      type: Sequelize.STRING
    },
    reasons: {
      type: Sequelize.STRING
    },
    travel_date: {
      type: Sequelize.DATE
    },
    return_date: {
      type: Sequelize.DATE
    },
    request_type: {
      type: Sequelize.ENUM,
      values: ['oneWayTrip', 'returnTrip'],
      defaultValue: 'oneWayTrip'
    },
    trip_plan: {
      type: Sequelize.ENUM,
      values: ['single', 'multiCity'],
      defaultValue: 'single'
    },
    status: {
      type: Sequelize.ENUM,
      values: ['open', 'pending', 'cancelled', 'rejected', 'approved'],
      defaultValue: 'open'
    },
    show_profile: {
      type: Sequelize.BOOLEAN,
      default: true
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
  down: queryInterface => queryInterface.dropTable('TripRequests')
};
