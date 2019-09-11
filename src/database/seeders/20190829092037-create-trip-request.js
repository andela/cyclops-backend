import uuid from 'uuid/v4';

export default {
  up: (queryInterface, Sequelize) => {
    const TripRequestData = [
      {
        uuid: '95ccd25d-2524-4b95-a441-8e2643c4c075',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        leaving_from: uuid(),
        travel_date: '10/28/2019',
        return_date: '10/30/2019',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('TripRequests', TripRequestData, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('TripRequests', null, {})
};
