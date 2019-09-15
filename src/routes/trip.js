import { Router } from 'express';
import authenticateUser from '../middlewares/authenticateUser';
import requestValidation from '../middlewares/requestValidation';
import TripRequestController from '../controllers/TripRequestController';

const router = Router();

router.post('/trips', authenticateUser, requestValidation.returnTrip, TripRequestController.createTripRequest);
router.get('/trips', authenticateUser, TripRequestController.tripsByUser);
router.patch('/trips/approve/:tripRequestUuid', authenticateUser, TripRequestController.approveRequest);

export default router;
