export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('AccommodationFacilities', {
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
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    image_url: {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    services: {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    amenities: {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    location: {
      type: Sequelize.STRING
    },
    is_approved: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
  down: (queryInterface) => queryInterface.dropTable('AccommodationFacilities')
};
