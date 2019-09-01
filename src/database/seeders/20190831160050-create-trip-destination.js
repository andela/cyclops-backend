export default {
  up: (queryInterface, Sequelize) => {
    const TripDestinations = [
      {
        uuid: 'efd594f0-3e96-4cba-b165-e716d1e3d508',
        trip_uuid: 'ce03b266-93f3-48d3-8ec6-a2b9e51cc058',
        office_location_uuid: 'b38fcf44-b77f-4149-8d66-454d7a5eacda',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: '80893488-86c2-4989-97a5-2396e588ced8',
        trip_uuid: 'a1383300-5edd-41ca-9435-68bcd52b89bd',
        office_location_uuid: 'b38fcf44-b77f-4149-8d66-454d7a5eacda',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: 'c9b21977-09b9-49bf-a9f7-fc2a0e7284b1',
        trip_uuid: '215c5fd4-e1e9-476a-a38c-f459ffa3d1ac',
        office_location_uuid: 'b38fcf44-b77f-4149-8d66-454d7a5eacda',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: 'cebed7ce-1c2c-46a4-8464-05d9bc5e25d9',
        trip_uuid: 'ce03b266-93f3-48d3-8ec6-a2b9e51cc058',
        office_location_uuid: 'd5c65b0b-e60a-4dad-ab99-25b752fcb9ae',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: 'f1911c19-3849-400c-8c30-139707a2b846',
        trip_uuid: '215c5fd4-e1e9-476a-a38c-f459ffa3d1ac',
        office_location_uuid: 'd5c65b0b-e60a-4dad-ab99-25b752fcb9ae',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: '32aa946b-420d-45c4-a2d4-18e18b38a5b3',
        trip_uuid: '215c5fd4-e1e9-476a-a38c-f459ffa3d1ac',
        office_location_uuid: 'd5c65b0b-e60a-4dad-ab99-25b752fcb9ae',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('TripDestinations', TripDestinations, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('TripDestinations', null, {})
};
