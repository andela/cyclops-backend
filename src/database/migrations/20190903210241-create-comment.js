export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Comments', {
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
    trip_request_uuid: {
      allowNull: false,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'TripRequests',
        key: 'uuid'
      },
    },
    message: {
      allowNull: false,
      type: Sequelize.STRING
    },
    deletedAt: {
      type: Sequelize.DATE,
      field: 'deleted_at'
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
  down: queryInterface => queryInterface.dropTable('Comments')
};
