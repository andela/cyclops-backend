import uuid from 'uuid/v4';
import faker from 'faker';

export default {
  up: (queryInterface, Sequelize) => {
    const UsersData = [];

    for (let i = 0; i < 15; i += 1) {
      const userData = {
        uuid: uuid(),
        email: faker.internet.email(),
        password: 'Password123',
        name: faker.name.findName(),
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      };
      UsersData.push(userData);
    }
    return queryInterface.bulkInsert('Users', UsersData, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
