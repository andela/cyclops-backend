import uuid from 'uuid/v4';
import faker from 'faker';
import { hashPassword } from '../../utils/hashPassword';

export default {
  up: (queryInterface, Sequelize) => {
    const UsersData = [
      {
        uuid: uuid(),
        name: 'Efe Justin',
        email: 'efejustin3@gmail.com',
        role: 'Manager',
        password: hashPassword('Jei12345'),
        is_verified: true,
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      }, 
      {
        uuid: uuid(),
        name: 'Efe Just',
        email: 'efejustin@gmail.com',
        role: 'Requester',
        password: hashPassword('John3162'),
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
        password: hashPassword('Bloated36'),
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: 'abef6009-48be-4b38-80d0-b38c1bc39922',
        email: 'greatness@andela.com',
        password: hashPassword('Password123'),
        name: 'Albert Faith',
        is_verified: true,
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: '407d0d03-be0d-477c-badd-5df63b04307e',
        email: 'mymail@naija.com',
        password: hashPassword('Password123'),
        name: 'Robert Dick',
        is_verified: true,
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        email: 'Jessica_Bins@hotmail.com',
        password: hashPassword('Password123'),
        name: 'Name Hettinger',
        role: 'Requester',
        is_verified: true,
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: '95ccd25d-2524-4b95-a441-8e2643c4c079',
        email: 'somemail@yahoo.com',
        password: hashPassword('Password123'),
        name: faker.name.findName(),
        role: 'Manager',
        is_verified: false,
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
      }
    ];
    return queryInterface.bulkInsert('Users', UsersData, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
