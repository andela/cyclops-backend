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
router.get('/accommodation', authenticateUser, AccommodationFacilityController.getAllApprovedAccommodation);
router.get('/accommodation/:accommodationUuid', 
  authenticateUser, 
  AccommodationFacilityController.getOneAccommodation);

router.get('/admin/accommodation', [authenticateUser, verifyRoles.verifyTravelAdmin], AccommodationFacilityController.getAllAccommodation);
router.put('/admin/approve_accommodation', [authenticateUser, verifyRoles.verifyTravelAdmin], AccommodationFacilityValidator.approveAccommodation, AccommodationFacilityController.approveAcommodation);

export default router;
