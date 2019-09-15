import uuid from 'uuid';

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [
    {
      uuid: uuid.v4(),
      name: 'Super Administrator',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: uuid.v4(),
      name: 'Travel Administrator',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: uuid.v4(),
      name: 'Travel Team Member',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: uuid.v4(),
      name: 'Manager',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: uuid.v4(),
      name: 'Requester',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
    {
      uuid: uuid.v4(),
      name: 'Supplier',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Roles', null, {})
};
