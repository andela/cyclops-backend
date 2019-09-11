export default {
  up: (queryInterface, Sequelize) => {
    const UsersComments = [
      {
        uuid: 'efbb7998-13dd-44fa-941f-671de1078ff5',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        trip_request_uuid: '215c5fd4-e1e9-476a-a38c-f459ffa3d1ac',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: 'c93d817a-f655-4b32-b838-6d9b930f837f',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        trip_request_uuid: '215c5fd4-e1e9-476a-a38c-f459ffa3d1ac',
        message: 'Cursus risus at ultrices mi tempus imperdiet nulla malesuada. Egestas dui id ornare arcu. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in.',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: '6eb297d2-9e7b-4166-b50d-09e3a24d669d',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        trip_request_uuid: '215c5fd4-e1e9-476a-a38c-f459ffa3d1ac',
        message: 'Morbi enim nunc faucibus a pellentesque sit amet.',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: '0abc4bd5-92f3-47a9-b033-d17bb7bb363c',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        trip_request_uuid: '215c5fd4-e1e9-476a-a38c-f459ffa3d1ac',
        message: 'Pharetra sit amet aliquam id diam. Integer enim neque volutpat ac tincidunt vitae. Et tortor consequat id porta nibh venenatis cras sed.',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: '76db1220-5216-4b67-a2ff-e040b18d838e',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        trip_request_uuid: '215c5fd4-e1e9-476a-a38c-f459ffa3d1ac',
        message: 'Suscipit tellus mauris a diam maecenas sed. Non diam phasellus vestibulum lorem. Dui id ornare arcu odio.',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        uuid: '4e8bd454-6a1a-4148-9dd5-7baf8c9a916e',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        trip_request_uuid: '215c5fd4-e1e9-476a-a38c-f459ffa3d1ac',
        message: 'Amet consectetur adipiscing elit pellentesque. Nibh tellus molestie nunc non blandit. Volutpat maecenas volutpat blandit aliquam etiam. ',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('Comments', UsersComments, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('Comments', null, {})
};
