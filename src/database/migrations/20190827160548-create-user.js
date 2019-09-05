export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.ENUM,
      values: ['employee', 'super_admin', 'travel_admin', 'travel_team_manager', 'manager', 'supplier'],
      defaultValue: 'employee'
    },
    is_verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    facebook_id: {
      type: Sequelize.STRING
    },
    google_id: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    date_of_birth: {
      type: Sequelize.DATE
    },
    department: {
      type: Sequelize.STRING
    },
    preferred_currency: {
      type: Sequelize.STRING
    },
    preferred_language: {
      type: Sequelize.STRING
    },
    residential_address: {
      type: Sequelize.STRING
    },
    image_url: {
      type: Sequelize.STRING
    },
    office_uuid: {
      type: Sequelize.UUID,
      references: {
        model: 'OfficeLocations',
        key: 'uuid'
      },
      onDelete: 'CASCADE'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'updated_at'
    }
  }),
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.dropTable('Users')
};
