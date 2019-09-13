import { Router } from 'express';
import BookingController from '../controllers/BookingController';
import authenticateUser from '../middlewares/authenticateUser';

const router = Router();

router.post('/bookings', authenticateUser, BookingController.create);
router.get('/bookings', authenticateUser, BookingController.index);

export default router;
