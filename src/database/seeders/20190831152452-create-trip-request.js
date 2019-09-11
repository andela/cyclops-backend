import uuid from 'uuid/v4';

export default {
  up: (queryInterface, Sequelize) => {
    const TripRequests = [
      {
        uuid: 'ce03b266-93f3-48d3-8ec6-a2b9e51cc058',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        leaving_from: 'dbf285c6-8d7c-4f71-8058-a82e22e27f6b',
        travel_reasons: 'Govt contract',
        travel_date: '10-10-2019',
        return_date: '11-11-2019',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: '95ccd25d-2524-4b95-a441-8e2643c4c075',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        leaving_from: uuid(),
        travel_date: '10-10-2019',
        return_date: '10-11-2019',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: 'a1383300-5edd-41ca-9435-68bcd52b89bd',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        leaving_from: 'dbf285c6-8d7c-4f71-8058-a82e22e27f6b',
        travel_reasons: 'Movie festival',
        travel_date: '10-10-2019',
        return_date: '11-11-2019',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: '215c5fd4-e1e9-476a-a38c-f459ffa3d1ac',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        leaving_from: '85b4a64e-331b-4051-a32c-6bc20eb0fc81',
        travel_reasons: 'Family discourse',
        travel_date: '10-10-2019',
        return_date: '11-11-2019',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('TripRequests', TripRequests, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('TripRequests', null, {})
};
