export default {
  up: (queryInterface, Sequelize) => {
    const Accommodations = [
      {
        uuid: '075b55f8-48ab-4a1b-a752-85d9c8675413',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        name: '',
        description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        image_url: ['https://via.placeholder.com/300.png/09f/fff', 'https://via.placeholder.com/300/09f.png/fff', 'https://via.placeholder.com/300/09f/fff.png'],
        services: ['Good food', 'swimming pool'],
        amenities: ['bar', 'exercise'],
        location: 'Lagos',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        uuid: 'f3994a53-e90b-4b92-b3fb-98d00b194910',
        user_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
        name: '',
        description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        image_url: ['https://via.placeholder.com/300.png/09f/fff', 'https://via.placeholder.com/300/09f.png/fff', 'https://via.placeholder.com/300/09f/fff.png'],
        services: ['Good food', 'swimming pool'],
        amenities: ['bar', 'exercise'],
        location: 'Lagos',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('AccommodationFacilities', Accommodations, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('AccommodationFacilities', null, {})
};
