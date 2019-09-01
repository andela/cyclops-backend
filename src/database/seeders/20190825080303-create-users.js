import uuid from 'uuid/v4';
import faker from 'faker';

export default {
  up: (queryInterface, Sequelize) => {
    const UsersData = [
      {
        uuid: uuid(),
        name: 'Justin',
        email: 'efejustin3@gmail.com',
        password: '$2b$06$9PXuJTiU/uSbRTSaag5NW.OsY.iq9rVI/.Q4qGOhmIAnxtsDpk9W2',
        is_verified: true,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }, {
        uuid: uuid(),
        name: 'Makaraba',
        email: 'blessingmakaraba@gmail.com',
        is_verified: false,
        password: 'bluewaters',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
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
