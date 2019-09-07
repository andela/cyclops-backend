import { Router } from 'express';
import authenticateUser from '../middlewares/authenticateUser';
import requestValidation from '../middlewares/requestValidation';
import CommentController from '../controllers/CommentController';

const router = Router();

router.post('/comment/trips', authenticateUser, requestValidation.comment, CommentController.createTripRequestComment);
router.put('/comment/trips/:commentUuid', authenticateUser, requestValidation.comment, CommentController.editTripRequestComment);
router.delete('/comment/trips/:uuid', authenticateUser, CommentController.delete);

export default router;
