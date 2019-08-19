import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.post('/auth/signup', UserController.register);
userRouter.post('/auth/signin', UserController.login);
userRouter.get('/auth', UserController.index);

export default userRouter;
