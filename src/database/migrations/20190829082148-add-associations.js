export default {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Users',
    'manager_uuid',
    {
      type: Sequelize.UUID,
      references: {
        model: 'Managers',
        key: 'uuid'
      },
    },
  ),
  // eslint-disable-next-line arrow-parens
  down: (queryInterface) => queryInterface.removeColumn(
    'Users',
    'manager_uuid',
  )
};
