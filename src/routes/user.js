/* eslint-disable linebreak-style */
import { Router } from 'express';
import passport from 'passport';
// eslint-disable-next-line no-unused-vars
import socialOAuth from '../services/socialOAuth';
import AuthController from '../controllers/AuthController';
import AdminCrontroller from '../controllers/AdminController';
import userAuth from '../middlewares/userAuth';
import authenticateUser from '../middlewares/authenticateUser';
import verifyRoles from '../middlewares/verifyRoles';

const userRouter = Router();

userRouter.post('/auth/signup', userAuth.signup, userAuth.userExistCheck, AuthController.signup);
userRouter.get('/user', authenticateUser, AuthController.show);
userRouter.put('/user', authenticateUser, AuthController.update);

userRouter.get('/oauth/google',
  passport.authenticate('google', { session: false }), AuthController.social);

userRouter.get('/oauth/facebook',
  passport.authenticate('facebook', { session: false }), AuthController.social);
userRouter.get('/auth/confirm_email', AuthController.confirmEmail);
userRouter.post('/auth/signin', userAuth.signin, AuthController.signin);
userRouter.get('/auth/signout', authenticateUser, AuthController.signout);

userRouter.post('/auth/forgot_password', AuthController.sendResetLink);
userRouter.put('/auth/reset_password/:uuid/:token', AuthController.resetPassword);
userRouter.get('/users', authenticateUser, verifyRoles.verifySupAdmin, AdminCrontroller.getUsers);
userRouter.get('/users/:email', authenticateUser, verifyRoles.verifySupAdmin, AdminCrontroller.getUser);
userRouter.put('/admin/assign_role', authenticateUser, verifyRoles.verifySupAdmin, AdminCrontroller.assignRole);
userRouter.put('/admin/assign_permission', authenticateUser, verifyRoles.verifySupAdmin, AdminCrontroller.assignPermission);

export default userRouter;
