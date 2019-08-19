export default {
  up: (queryInterface) /* , Sequelize */ => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      username: 'johndoe',
      email: 'demo@demo.com',
      password: 'demo@demo.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: queryInterface /* , Sequelize */ => queryInterface.bulkDelete('Users', null, {})
};
