export default {
  up: (queryInterface, Sequelize) => {
    const TripRequests = [
      {
        uuid: 'ce03b266-93f3-48d3-8ec6-a2b9e51cc058',
        user_uuid: 'abef6009-48be-4b38-80d0-b38c1bc39922',
        leaving_from: 'Abuja',
        reasons: 'Govt contract',
        travel_date: '10-10-2019',
        return_date: '11-11-2019',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: 'a1383300-5edd-41ca-9435-68bcd52b89bd',
        user_uuid: 'abef6009-48be-4b38-80d0-b38c1bc39922',
        leaving_from: 'Lagos',
        reasons: 'Movie festival',
        travel_date: '10-10-2019',
        return_date: '11-11-2019',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: '215c5fd4-e1e9-476a-a38c-f459ffa3d1ac',
        user_uuid: '407d0d03-be0d-477c-badd-5df63b04307e',
        leaving_from: 'Abidjan',
        reasons: 'Family discourse',
        travel_date: '10-10-2019',
        return_date: '11-11-2019',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('TripRequests', TripRequests, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('TripRequests', null, {})
};
