export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Notifications', {
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
    message: Sequelize.STRING,
    status: {
      type: Sequelize.ENUM,
      values: ['unread', 'read'],
      defaultValue: 'unread'
    },
    notification_type: {
      type: Sequelize.ENUM,
      values: ['comment', 'tripRequest'],
      defaultValue: 'tripRequest'
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
  down: queryInterface => queryInterface.dropTable('Notifications')
};
