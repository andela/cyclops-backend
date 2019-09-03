import uuid from 'uuid';

export default {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    uuid: uuid.v4(),
    name: 'Awa Dieudonne',
    email: 'dieudonneawa7@gmail.com',
    password: 'workingwithseeds',
    role: 'employee',
    is_verified: true,
    gender: 'male',
    date_of_birth: '2019-08-28',
    department: 'research',
    preferred_language: 'french',
    preferred_currency: 'FCFA',
    image_url: 'http://images.com/myimagefile',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
