import { Router } from 'express';
import authenticate from '../middlewares/authenticateUser';
import requestValidation from '../middlewares/requestValidation';
import TripRequestController from '../controllers/TripRequestController';

const router = Router();

router.post('/trip_request', authenticate.authenticateUser, authenticate.isblackListedToken, requestValidation.returnTrip, TripRequestController.createTripRequest);

export default router;
