export default {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    name: 'John Doe',
    username: 'johndoe',
    email: 'demo@demo.com',
    password: 'demo@demo.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
