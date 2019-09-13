import uuid from 'uuid/v4';
import faker from 'faker';
import { hashPassword } from '../../utils/hashPassword';

export default {
  up: (queryInterface, Sequelize) => {
    const UsersData = [
      {
        uuid: '95ccd25d-2524-4b95-a441-8e2643c4c072',
        name: 'Efe Justin',
        email: 'efejustin3@gmail.com',
        password: hashPassword('Jei12345', 10),
        role: 'Manager',
        is_verified: true,
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: '95ccd25d-2524-4b95-a441-8e2643c4c073',
        name: 'Efe Justins',
        email: 'efejustin@gmail.com',
        password: hashPassword('Jei12345', 10),
        role: 'Requester',
        is_verified: true,
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: uuid(),
        name: 'Makaraba Blessing',
        email: 'blessingpeople@gmail.com',
        role: 'Manager',
        is_verified: false,
        password: hashPassword('Bloated36', 10),
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: 'abef6009-48be-4b38-80d0-b38c1bc39922',
        email: 'greatness@andela.com',
        password: hashPassword('Password123', 10),
        name: 'Albert Faith',
        is_verified: true,
        role: 'Requester',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: '407d0d03-be0d-477c-badd-5df63b04307e',
        email: 'mymail@naija.com',
        password: hashPassword('Password123', 10),
        name: 'Robert Dick',
        role: 'Requester',
        is_verified: true,
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        email: 'Jessica_Bins@hotmail.com',
        password: hashPassword('Password123', 10),
        name: 'Name Hettinger',
        role: 'Requester',
        is_verified: true,
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: '95ccd25d-2524-4b95-a441-8e2643c4c079',
        email: 'somemail@yahoo.com',
        password: hashPassword('Password123', 10),
        is_verified: false,
        role: 'Manager',
        name: faker.name.findName(),
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: uuid(),
        name: 'Awa Mail',
        email: 'awamail@gmail.com',
        password: hashPassword('Workingwith1seed'),
        role: 'Super Administrator',
        is_verified: true,
        gender: 'male',
        date_of_birth: '2019-08-28',
        department: 'research',
        preferred_language: 'french',
        preferred_currency: 'FCFA',
        image_url: 'http://images.com/myimagefile',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        uuid: uuid(),
        name: 'Awa Dieudonne',
        email: 'dieudonneawa7@gmail.com',
        password: hashPassword('Workingwith1seed'),
        role: 'Super Administrator',
        is_verified: true,
        gender: 'male',
        date_of_birth: '2019-08-28',
        department: 'research',
        preferred_language: 'french',
        preferred_currency: 'FCFA',
        image_url: 'http://images.com/myimagefile',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        uuid: 'fd847314-71c5-4385-95ee-966c975a3ddd',
        name: 'Suspie Abobo',
        email: 'suspieabobo@yahoo.com',
        role: 'Supplier',
        is_verified: true,
        password: hashPassword('Bloated36', 10),
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
    ];
    return queryInterface.bulkInsert('Users', UsersData, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
