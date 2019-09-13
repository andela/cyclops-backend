import { Router } from 'express';

import authenticateUser from '../middlewares/authenticateUser';
import AccommodationFacilityController from '../controllers/AccommodationFacilityController';
import AccommodationFacilityValidator from '../middlewares/accommodationValidation';

const router = Router();

router.post('/room', 
  authenticateUser, 
  AccommodationFacilityValidator.createRoom,
  AccommodationFacilityController.createRoom);

export default router;
