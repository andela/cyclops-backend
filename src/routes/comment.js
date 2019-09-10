import { Router } from 'express';
import authenticateUser from '../middlewares/authenticateUser';
import requestValidation from '../middlewares/requestValidation';
import CommentController from '../controllers/CommentController';

const router = Router();

router.post('/comment/trips', authenticateUser, requestValidation.createComment, CommentController.createTripRequestComment);

export default router;
