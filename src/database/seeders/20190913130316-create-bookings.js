import dateRangeGen from '../../utils/dateRangeGen';

export default {
  up: (queryInterface, Sequelize) => {
    const Bookings = [
      {
        uuid: '0bd7e2aa-db1a-4d8f-b95b-6f728ebdb823',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        room_uuid: '63e73997-a2df-4cb4-9fe5-8aeb480c76aa',
        dates: dateRangeGen('2019-12-01', '2019-12-05'),
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: 'ac3bdac6-b1f4-4f17-9455-5ae1f052b32f',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        room_uuid: '63e73997-a2df-4cb4-9fe5-8aeb480c76aa',
        dates: dateRangeGen('2020-01-01', '2020-01-03'),
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: '30a4c053-4768-4df4-baf0-9ea896c1dacd',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        room_uuid: '8662cc71-0ded-4148-a908-4bafce0f93dd',
        dates: dateRangeGen('2020-01-15', '2020-01-20'),
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: '595b931b-93b3-4663-a296-2b2d9afebc40',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        room_uuid: 'c3c570b2-8d39-44f7-8d3e-343917011b64',
        dates: dateRangeGen('2020-02-05', '2020-02-20'),
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: '18f50d97-a80c-4cb5-b4fb-3cea699deafa',
        user_uuid: 'abef6009-48be-4b38-80d0-b38c1bc39922',
        room_uuid: 'dcef807a-daaa-4644-8a3e-7622cbfc2f37',
        dates: dateRangeGen('2020-03-09', '2020-03-15'),
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: '54258286-bf60-48d2-9910-d5daff02a391',
        user_uuid: 'abef6009-48be-4b38-80d0-b38c1bc39922',
        room_uuid: 'dcef807a-daaa-4644-8a3e-7622cbfc2f37',
        dates: dateRangeGen('2020-04-11', '2020-05-11'),
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('Bookings', Bookings, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('Bookings', null, {})
};
