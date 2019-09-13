import { Router } from 'express';
import authenticateUser from '../middlewares/authenticateUser';
import AccommodationFacilityController from '../controllers/AccommodationFacilityController';
import verifyRoles from '../middlewares/verifyRoles';
import AccommodationFacilityValidator from '../middlewares/accommodationValidation';

const router = Router();

router.post('/accommodation', 
  [authenticateUser, verifyRoles.verifySupplier], 
  AccommodationFacilityValidator.createAccommodation,
  AccommodationFacilityController.createAccommodation);
router.get('/accommodation', authenticateUser, AccommodationFacilityController.getAllAccommodation);
router.get('/accommodation/:accommodationUuid', 
  authenticateUser, 
  AccommodationFacilityController.getOneAccommodation);

export default router;
