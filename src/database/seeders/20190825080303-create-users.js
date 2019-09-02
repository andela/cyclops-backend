import uuid from 'uuid/v4';
import faker from 'faker';
import bcrypt from 'bcrypt';

export default {
  up: (queryInterface, Sequelize) => {
    const UsersData = [
      {
        uuid: uuid(),
        name: 'Justin',
        email: 'efejustin3@gmail.com',
        password: bcrypt.hashSync('Jei12345', 10),
        is_verified: true,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }, {
        uuid: uuid(),
        name: 'Makaraba',
        email: 'blessingpeople@gmail.com',
        is_verified: false,
        password: bcrypt.hashSync('Bloated36', 10),
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        email: 'Jessica_Bins@hotmail.com',
        password: 'Password123',
        name: 'Name Hettinger',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: '95ccd25d-2524-4b95-a441-8e2643c4c079',
        email: faker.internet.email(),
        password: 'Password123',
        name: faker.name.findName(),
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('Users', UsersData, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
