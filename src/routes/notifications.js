import { Router } from 'express';

import authenticateUser from '../middlewares/authenticateUser'
import commentNotificationController from '../controllers/CommentNotificationController';

const notificationRoutes = Router();

// Live notification endpoint for user creation.
notificationRoutes.get('/comment', authenticateUser, commentNotificationController.create);

export default notificationRoutes;
