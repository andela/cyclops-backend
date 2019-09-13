export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Bookings', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    user_uuid: {
      type: Sequelize.UUID
    },
    room_uuid: {
      type: Sequelize.UUID
    },
    dates: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'open'
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
  down: queryInterface => queryInterface.dropTable('Bookings')
};
