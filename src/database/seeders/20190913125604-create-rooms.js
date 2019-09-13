export default {
  up: (queryInterface, Sequelize) => {
    const Rooms = [
      {
        uuid: '63e73997-a2df-4cb4-9fe5-8aeb480c76aa',
        accommodation_uuid: '075b55f8-48ab-4a1b-a752-85d9c8675413',
        name: 'Zion',
        type: 'Deluxe',
        cost: '11.15',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: '8662cc71-0ded-4148-a908-4bafce0f93dd',
        accommodation_uuid: 'f3994a53-e90b-4b92-b3fb-98d00b194910',
        name: 'Chessta',
        type: 'Deluxe',
        cost: '444.55',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: 'c3c570b2-8d39-44f7-8d3e-343917011b64',
        accommodation_uuid: '075b55f8-48ab-4a1b-a752-85d9c8675413',
        name: 'Buhari',
        type: 'Presidential',
        cost: '66677.8',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: 'dcef807a-daaa-4644-8a3e-7622cbfc2f37',
        accommodation_uuid: 'f3994a53-e90b-4b92-b3fb-98d00b194910',
        name: 'GEJ',
        type: 'Presidential',
        cost: '7676758.8996',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('Rooms', Rooms, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('Rooms', null, {})
};
