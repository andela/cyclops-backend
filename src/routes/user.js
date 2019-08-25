import { Router } from 'express';
import passport from 'passport';
// eslint-disable-next-line no-unused-vars
import socialOAuth from '../services/socialOAuth';
import UserController from '../controllers/UserController';
import SocialLoginController from '../controllers/SocialLoginController';
import userAuth from '../middlewares/userAuth';

const userRouter = Router();

userRouter.post('/signup', userAuth.signup, UserController.signup);

userRouter.get('/google',
  passport.authenticate('google', { session: false }), SocialLoginController.action);

userRouter.get('/facebook',
  passport.authenticate('facebook', { session: false }), SocialLoginController.action);

export default userRouter;
