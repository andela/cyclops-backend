import { Router } from 'express';
import authenticateUser from '../middlewares/authenticateUser';
import requestValidation from '../middlewares/requestValidation';
import TripRequestController from '../controllers/TripRequestController';

const router = Router();

router.post('/trips', authenticateUser, requestValidation.returnTrip, TripRequestController.createTripRequest);
router.get('/trips', authenticateUser, TripRequestController.tripsByUser);

export default router;
