/* eslint-disable linebreak-style */
import { Router } from 'express';
import passport from 'passport';
// eslint-disable-next-line no-unused-vars
import socialOAuth from '../services/socialOAuth';
import AuthController from '../controllers/AuthController';
import userAuth from '../middlewares/userAuth';
import passToken from '../middlewares/index';

const userRouter = Router();

userRouter.post('/auth/signup', userAuth.signup, userAuth.userExistCheck, AuthController.signup);
userRouter.get('/user', passToken, AuthController.show);
userRouter.put('/user', passToken, AuthController.update);

userRouter.get('/oauth/google',
  passport.authenticate('google', { session: false }), AuthController.social);

userRouter.get('/oauth/facebook',
  passport.authenticate('facebook', { session: false }), AuthController.social);
userRouter.post('/auth/signin', userAuth.signin, AuthController.signin);

userRouter.post('/auth/forgotPassword', AuthController.sendResetLink);
userRouter.put('/auth/resetPassword/:uuid/:token', AuthController.resetPassword);

export default userRouter;
