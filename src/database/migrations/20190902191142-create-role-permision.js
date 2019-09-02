export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('RolePermissions', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true
    },
    role_id: {
      type: Sequelize.UUID,
      allowNull: false
    },
    permission_id: {
      type: Sequelize.UUID,
      allowNull: false
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
  down: queryInterface => queryInterface.dropTable('RolePermissions')
};
