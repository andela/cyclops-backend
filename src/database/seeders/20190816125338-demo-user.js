import uuid from 'uuid';

export default {
  up: (queryInterface) => queryInterface.bulkInsert('users', [{
    id: uuid(),
    first_name: 'Blessinf',
    last_name: 'Makaraba',
    email: 'blessingmakaraba@gmail.com',
    password: 'bluewaters',
    created_at: new Date(),
    updated_at: new Date()
  }], {}),
  down: (queryInterface) => queryInterface.bulkDelete('users', null, {})
};
