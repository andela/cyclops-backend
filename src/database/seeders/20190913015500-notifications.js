import uuid from 'uuid';

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const notificationData = [
      {
        uuid: uuid(),
        user_uuid: 'abef6009-48be-4b38-80d0-b38c1bc39922',
        message: 'Can i have my trip request approved?',
        status: 'unread',
        notification_type: 'comment',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        uuid: uuid(),
        user_uuid: 'abef6009-48be-4b38-80d0-b38c1bc39922',
        message: 'Please i need my trip request approved',
        status: 'unread',
        notification_type: 'comment',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    return queryInterface.bulkInsert('Notifications', notificationData, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Notifications', null, {});
  }
};
