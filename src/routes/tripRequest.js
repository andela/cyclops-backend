import { Router } from 'express';
import authenticateUser from '../middlewares/authenticateUser';
import requestValidation from '../middlewares/requestValidation';
import TripRequestController from '../controllers/TripRequestController';

const router = Router();

router.post('/trip_request', authenticateUser, requestValidation.returnTrip, TripRequestController.createTripRequest);

export default router;
