import { Router } from 'express';
import authenticateUser from '../middlewares/authenticateUser';
import OfficeController from '../controllers/OfficeController';

const router = Router();

router.get('/office', authenticateUser, OfficeController.getOfficeLocations);

export default router;
