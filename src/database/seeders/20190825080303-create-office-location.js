export default {
  up: (queryInterface, Sequelize) => {
    const OfficeLocations = [
      {
        uuid: 'b38fcf44-b77f-4149-8d66-454d7a5eacda',
        address: '146 ET',
        city: 'Lagos',
        state: 'Lagos',
        country: 'BlackNation',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: 'd5c65b0b-e60a-4dad-ab99-25b752fcb9ae',
        address: '14 Marian Road',
        city: 'Calabar',
        state: 'Cross River State',
        country: 'BuhariEconomy',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('OfficeLocations', OfficeLocations, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('OfficeLocations', null, {})
};
