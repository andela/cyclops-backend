export default {
  up: (queryInterface, Sequelize) => {
    const ManagersData = [
      {
        uuid: '95ccd25d-2524-4b95-a441-8e2643c4c078',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c079',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('Managers', ManagersData, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
