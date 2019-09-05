import { Router } from 'express';
import authenticate from '../middlewares/authenticateUser';
import OfficeController from '../controllers/OfficeController';

const router = Router();

router.get('/office', authenticate.authenticateUser, OfficeController.getOfficeLocations);

export default router;
