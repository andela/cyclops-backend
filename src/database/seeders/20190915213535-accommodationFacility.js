import uuid from 'uuid';

module.exports = {
  up: (queryInterface) => {
    const AccommodationData = [
      {
        uuid: uuid.v4(),
        user_uuid: 'fd847314-71c5-4385-95ee-966c975a3ddd',
        name: 'Gold Lodge',
        description: 'We offer a plethora of services',
        image_url: ['https://res.cloudinary.com/blessing.png'],
        location: '9, Express-Way, Delta State',
        amenities: ['Electricity', 'Water'],
        services: ['Laundry', 'Repairs'],
        is_approved: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuid.v4(),
        user_uuid: 'fd847314-71c5-4385-95ee-966c975a3ddd',
        name: 'The Pyramid',
        description: 'This is the pyramid',
        image_url: ['https://res.cloudinary.com/blessing.png'],
        location: '9, Express-Way, Delta State',
        amenities: ['Electricity', 'Water'],
        services: ['Laundry', 'Repairs'],
        is_approved: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];
    return queryInterface.bulkInsert('AccommodationFacilities', AccommodationData, {});
  },
  // eslint-disable-next-line arrow-parens
  down: queryInterface => queryInterface.bulkDelete('AccommodationFacilities', null, {})
};
