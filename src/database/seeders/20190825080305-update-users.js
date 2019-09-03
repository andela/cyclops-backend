export default {
  // eslint-disable-next-line arrow-parens
  up: queryInterface => {
    const UsersData = {
      manager_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c078'
    };
    const condition = {
      uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077'
    };
    return queryInterface.bulkUpdate('Users', UsersData, condition);
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
