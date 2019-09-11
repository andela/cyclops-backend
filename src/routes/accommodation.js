import { Router } from 'express';
import authenticateUser from '../middlewares/authenticateUser';
import AdminController from '../controllers/AdminController';
import accommodationValidation from '../middlewares/accommodationValidation';
import verifyRoles from '../middlewares/verifyRoles';

const router = Router();

router.post('/accommodation_locations', authenticateUser, verifyRoles.verifyTravelAdmin, accommodationValidation.validateAcc, AdminController.createAccommodationLocation);
router.post('/accommodation_locations/:accommodation_location_uuid/rooms', authenticateUser, verifyRoles.verifyTravelAdmin, accommodationValidation.validateRoom, AdminController.createRoom);

export default router;
