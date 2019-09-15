
export default {
  // eslint-disable-next-line arrow-parens
  up: queryInterface => {
    const UsersData = {
      manager_uuid: 'f973e4a0-e16e-4c59-869a-d0ee25aa1f8d'
    };
    const condition = {
      uuid: '50895de7-9ddd-4589-83e9-c4bb1cc93da7'
    };
    return queryInterface.bulkUpdate('Users', UsersData, condition);
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
