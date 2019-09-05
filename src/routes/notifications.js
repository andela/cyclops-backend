import { Router } from 'express';

import userNotificationController from '../controllers/ExampleUserNotificationController';

const notificationRoutes = Router();

// Live notification endpoint for user creation.
notificationRoutes.get('/user', userNotificationController.create);

// Example Live notification endpoint for request.

//  notificationRoutes.get(
//    '/request',
//    authenticateUser,
//    notificationController.requestNotifications
//   );

export default notificationRoutes;
