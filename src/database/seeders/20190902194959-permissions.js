import uuid from 'uuid';

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Permissions', [
    {
      uuid: uuid.v4(),
      name: 'create',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: uuid.v4(),
      name: 'read',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: uuid.v4(),
      name: 'update',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: uuid.v4(),
      name: 'delete',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Permissions', null, {}),
};
