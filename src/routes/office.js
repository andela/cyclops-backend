import { Router } from 'express';
import authenticateUser from '../middlewares/authenticateUser';
import OfficeController from '../controllers/OfficeController';
import verifyRoles from '../middlewares/verifyRoles';

const router = Router();

router.get('/office', authenticateUser, verifyRoles.verifyRequester, OfficeController.getOfficeLocations);

export default router;
