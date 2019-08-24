import { Router } from 'express';
import passport from 'passport';
// eslint-disable-next-line no-unused-vars
import socialOAuth from '../services/socialOAuth';
import AuthController from '../controllers/AuthController';
import userAuth from '../middlewares/userAuth';

const userRouter = Router();

userRouter.post('/auth/signup', userAuth.signup, AuthController.signup);

userRouter.get('/oauth/google',
  passport.authenticate('google', { session: false }), AuthController.social);

userRouter.get('/oauth/facebook',
  passport.authenticate('facebook', { session: false }), AuthController.social);
userRouter.post('/auth/signin', userAuth.signin, AuthController.signin);

export default userRouter;
