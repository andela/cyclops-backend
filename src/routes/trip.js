import { Router } from 'express';
import TripRequestController from '../controllers/TripRequestController';
import Auth from '../middlewares/Auth';

const tripRouter = Router();

tripRouter.get('/trips', Auth, TripRequestController.tripsByUser);

export default tripRouter;
