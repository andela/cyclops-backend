import { Router } from 'express';
import UserController from '../controllers/UserController';
import userAuth from '../middlewares/userAuth';

const userRouter = Router();

userRouter.post('/auth/signup', userAuth.signup, UserController.signup);

export default userRouter;
