/* eslint-disable import/no-extraneous-dependencies */
import uuid from 'uuid/v4';
import faker from 'faker';

export default {
  up: (queryInterface, Sequelize) => {
    const UsersData = [
      {
        uuid: uuid(),
        name: 'Justin',
        email: 'efejustin3@gmail.com',
        office_uuid: 'b38fcf44-b77f-4149-8d66-454d7a5eacda',
        password: '$2b$06$9PXuJTiU/uSbRTSaag5NW.OsY.iq9rVI/.Q4qGOhmIAnxtsDpk9W2',
        is_verified: true,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: uuid(),
        name: 'Makaraba',
        email: 'blessingmakaraba@gmail.com',
        is_verified: false,
        password: 'bluewaters',
        office_uuid: 'd5c65b0b-e60a-4dad-ab99-25b752fcb9ae',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: 'abef6009-48be-4b38-80d0-b38c1bc39922',
        email: 'greatness@andela.com',
        password: 'Password123',
        name: 'Albert Faith',
        is_verified: true,
        office_uuid: 'b38fcf44-b77f-4149-8d66-454d7a5eacda',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: '407d0d03-be0d-477c-badd-5df63b04307e',
        email: 'mymail.naija.com',
        password: 'Password123',
        name: 'Robert Dick',
        is_verified: true,
        office_uuid: 'd5c65b0b-e60a-4dad-ab99-25b752fcb9ae',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
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
