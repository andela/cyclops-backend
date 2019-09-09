import uuid from 'uuid/v4';
import faker from 'faker';

export default {
  up: (queryInterface, Sequelize) => {
    const officeLocations = [
      {
        uuid: 'dbf285c6-8d7c-4f71-8058-a82e22e27f6b',
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: '85b4a64e-331b-4051-a32c-6bc20eb0fc81',
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: 'b38fcf44-b77f-4149-8d66-454d7a5eacda',
        address: '146 ET',
        city: 'Lagos',
        state: 'Lagos',
        country: 'BlackNation',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: 'd5c65b0b-e60a-4dad-ab99-25b752fcb9ae',
        address: '14 Marian Road',
        city: 'Calabar',
        state: 'Cross River State',
        country: 'BuhariEconomy',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      }
    ];

    for (let i = 1; i < 11; i += 1) {
      const officeLocation = {
        uuid: uuid(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      };
      officeLocations.push(officeLocation);
    }
    return queryInterface.bulkInsert('OfficeLocations', officeLocations, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('OfficeLocations', null, {})
};
