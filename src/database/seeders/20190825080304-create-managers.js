export default {
  up: (queryInterface, Sequelize) => {
    const ManagersData = [
      {
        uuid: '95ccd25d-2524-4b95-a441-8e2643c4c078',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c079',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: 'f973e4a0-e16e-4c59-869a-d0ee25aa1f8d',
        user_uuid: '0ee072c5-0b45-4991-b703-57a64af32da0',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('Managers', ManagersData, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
